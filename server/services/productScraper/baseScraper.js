import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import Product from '../../models/productModel.js';
import SyncLog from '../../models/syncLogModel.js';
import { downloadImage, sleep } from './scraperUtils.js';

export default class BaseScraper {
    constructor(brandName, startUrl, config = {}) {
        this.brandName = brandName;
        this.startUrl = startUrl;
        this.config = {
            usePuppeteer: false,
            productSelector: 'div.product-card', // Default
            nameSelector: 'h1.title',
            priceSelector: 'span.price',
            descSelector: 'div.description',
            imgSelector: 'img.product-image',
            linkSelector: 'a.product-link',
            ...config
        };
        this.stats = { found: 0, inserted: 0, updated: 0, failed: 0 };
    }

    async getPageContent(url) {
        try {
            if (this.config.usePuppeteer) {
                const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
                const page = await browser.newPage();
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
                await page.goto(url, { waitUntil: 'networkidle2' });
                const content = await page.content();
                await browser.close();
                return cheerio.load(content);
            } else {
                const { data } = await axios.get(url, {
                    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }
                });
                return cheerio.load(data);
            }
        } catch (error) {
            console.error(`Error fetching ${url}:`, error.message);
            throw error;
        }
    }

    // Override in subclass for specific extraction logic
    async scrape() {
        console.log(`[${this.brandName}] Starting sync...`);
        try {
            await this.processCatalog(this.startUrl);
        } catch (error) {
            console.error(`[${this.brandName}] Critical failure:`, error.message);
        }
        await this.logResults();
    }

    async processProduct(url) {
        await sleep(2000); // Politeness delay
        try {
            const $ = await this.getPageContent(url);

            // Extract Data (Generic fallback, specific scrapers should override extractProductData)
            const data = await this.extractProductData($, url);

            if (data && data.name) {
                this.stats.found++;
                const existing = await Product.findOne({
                    where: { name: data.name, brand: this.brandName }
                });

                // Download image if available
                let localImageUrl = existing ? existing.image_url : null;
                if (data.imageUrl && (!existing || !existing.image_url)) {
                    const downloaded = await downloadImage(data.imageUrl, data.name);
                    if (downloaded) localImageUrl = downloaded;
                }

                const productData = {
                    ...data,
                    brand: this.brandName,
                    image_url: localImageUrl,
                    source_url: url,
                    last_synced_at: new Date()
                };

                if (existing) {
                    await existing.update(productData);
                    this.stats.updated++;
                } else {
                    await Product.create(productData);
                    this.stats.inserted++;
                }
            }
        } catch (error) {
            console.error(`[${this.brandName}] Product error (${url}):`, error.message);
            this.stats.failed++;
        }
    }

    async logResults() {
        console.log(`[${this.brandName}] Completed. Inserted: ${this.stats.inserted}, Updated: ${this.stats.updated}, Failed: ${this.stats.failed}`);
        await SyncLog.create({
            brand: this.brandName,
            total_found: this.stats.found,
            inserted: this.stats.inserted,
            updated: this.stats.updated,
            failed: this.stats.failed,
            run_date: new Date()
        });
    }

    // To be implemented by subclasses
    async processCatalog(url) {
        throw new Error("processCatalog must be implemented by subclass");
    }

    async extractProductData($, url) {
        throw new Error("extractProductData must be implemented by subclass");
    }
}
