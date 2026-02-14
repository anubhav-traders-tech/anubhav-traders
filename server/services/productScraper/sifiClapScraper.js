import BaseScraper from './baseScraper.js';

export default class SifiClapScraper extends BaseScraper {
    constructor() {
        super('Sifi Prakash', 'https://onlineprakash.com/product-category/clap/');
    }

    async processCatalog(url) {
        // WooCommerce
        const $ = await this.getPageContent(url);
        const links = [];

        $('.product .woocommerce-loop-product__link').each((i, el) => {
            links.push($(el).attr('href'));
        });

        console.log(`[Sifi Clap] Found ${links.length} products.`);

        for (const link of links) {
            await this.processProduct(link);
        }
    }

    async extractProductData($, url) {
        const name = $('h1.product_title').text().trim();
        const description = $('.woocommerce-product-details__short-description').text().trim();
        const priceText = $('.price').first().text();
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        const imageUrl = $('.woocommerce-product-gallery__image img').attr('src');

        return {
            name,
            description,
            retail_price: price,
            imageUrl,
            category: 'Clap',
            brand: 'Sifi Prakash'
        };
    }
}
