import BaseScraper from './baseScraper.js';

export default class SifiScraper extends BaseScraper {
    constructor() {
        super('Sifi Prakash Namkeen', 'https://sifiprakash.com/shop');
    }

    async processCatalog(url) {
        const $ = await this.getPageContent(url);
        const links = [];

        $('.products .product a.woocommerce-LoopProduct-link').each((i, el) => {
            links.push($(el).attr('href'));
        });

        for (const link of links) {
            await this.processProduct(link);
        }
    }

    async extractProductData($, url) {
        return {
            name: $('h1.product_title').text().trim(),
            description: $('.woocommerce-product-details__short-description').text().trim(),
            retail_price: parseFloat($('.price').first().text().replace(/[^\d.]/g, '')),
            imageUrl: $('.wp-post-image').attr('src'),
            category: 'Namkeen',
            sku: $('.sku').text().trim()
        };
    }
}
