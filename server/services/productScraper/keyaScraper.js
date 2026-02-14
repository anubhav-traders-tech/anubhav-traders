import BaseScraper from './baseScraper.js';

export default class KeyaScraper extends BaseScraper {
    constructor() {
        super('Keya', 'https://keyafoods.com/collections/all?srsltid=AfmBOoqhMaQmzqKi_OD-SZJSwJKjsRIbqCG5LfyvO612gX3TambhOag');
    }

    async processCatalog(url) {
        const $ = await this.getPageContent(url);
        const links = [];

        $('.product-card a').each((i, el) => {
            let href = $(el).attr('href');
            if (href && !href.startsWith('http')) href = `https://keyafoods.com${href}`;
            links.push(href);
        });

        console.log(`[Keya] Found ${links.length} products.`);

        for (const link of links) {
            await this.processProduct(link);
        }
    }

    async extractProductData($, url) {
        const name = $('.product_title').text().trim() || $('h1.h2').text().trim();
        const description = $('.product-single__description').text().trim();
        const priceText = $('.price .amount').first().text() || $('.product__price').first().text();
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        let imageUrl = $('.product-single__photo img').attr('src') || $('.product__photo img').attr('src');

        if (imageUrl && imageUrl.startsWith('//')) imageUrl = `https:${imageUrl}`;

        return {
            name,
            description,
            retail_price: price,
            imageUrl,
            category: 'Food & Spices',
            brand: 'Keya'
        };
    }
}
