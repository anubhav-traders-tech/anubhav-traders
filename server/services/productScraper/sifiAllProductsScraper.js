import BaseScraper from './baseScraper.js';
export default class SifiAllProductsScraper extends BaseScraper {
    constructor() { super('Sifi Prakash', 'https://onlineprakash.com/our-products/', 'Namkeen'); }
    async processCatalog(url) {
        const $ = await this.getPageContent(url);
        const links = [];
        $('.product .woocommerce-loop-product__link').each((i, el) => links.push($(el).attr('href')));
        for (const link of links) await this.processProduct(link);
    }
    async extractProductData($, url) {
        return {
            name: $('h1.product_title').text().trim(),
            description: $('.woocommerce-product-details__short-description').text().trim(),
            retail_price: parseFloat($('.price').first().text().replace(/[^\d.]/g, '')) || null,
            imageUrl: $('.woocommerce-product-gallery__image img').attr('src')
        };
    }
}
