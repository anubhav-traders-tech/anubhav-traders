import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { Brand, Category, Product, SyncLog } from '../../models/index.js';
import { downloadImage, sleep, slugify } from './scraperUtils.js';

export default class BaseScraper {
    constructor(brandName, startUrl, categoryName, config = {}) {
        this.brandName = brandName;
        this.startUrl = startUrl;
        this.categoryName = categoryName;
        this.config = { usePuppeteer: false, ...config };
        this.stats = { found: 0, inserted: 0, updated: 0, failed: 0 };
    }

    async getPageContent(url) {
        if (this.config.usePuppeteer) {
            const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });
            const content = await page.content();
            await browser.close();
            return cheerio.load(content);
        }
        const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        return cheerio.load(data);
    }

    async scrape() {
        try {
            console.log(`[${this.brandName}] Starting sync for ${this.categoryName}...`);
            // Ensure Brand exists
            const [brand] = await Brand.findOrCreate({
                where: { name: this.brandName },
                defaults: { slug: slugify(this.brandName) }
            });

            // Ensure Category exists
            const [category] = await Category.findOrCreate({
                where: { name: this.categoryName, BrandId: brand.id },
                defaults: { slug: slugify(this.categoryName) }
            });

            this.brandId = brand.id;
            this.categoryId = category.id;

            await this.processCatalog(this.startUrl);
        } catch (error) {
            console.error(`[${this.brandName}] Critical failure:`, error.message);
        }
        await this.logResults();
    }

    async processProduct(url) {
        await sleep(1000);
        try {
            const $ = await this.getPageContent(url);
            const data = await this.extractProductData($, url);
            if (!data || !data.name) return;

            this.stats.found++;
            const existing = await Product.findOne({
                where: { name: data.name, BrandId: this.brandId }
            });

            let localImageUrl = existing ? existing.image_url : null;
            if (data.imageUrl && (!existing || !existing.image_url)) {
                localImageUrl = await downloadImage(data.imageUrl, data.name) || data.imageUrl;
            }

            const productData = {
                ...data,
                slug: slugify(data.name),
                BrandId: this.brandId,
                CategoryId: this.categoryId,
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
        } catch (error) {
            console.error(`[${this.brandName}] Product error (${url}):`, error.message);
            this.stats.failed++;
        }
    }

    async logResults() {
        console.log(`[${this.brandName}] Done. Found: ${this.stats.found}, New: ${this.stats.inserted}, Updated: ${this.stats.updated}, Failed: ${this.stats.failed}`);
        await SyncLog.create({
            brand: this.brandName,
            total_found: this.stats.found,
            inserted: this.stats.inserted,
            updated: this.stats.updated,
            failed: this.stats.failed
        });
    }
}
