import BaseScraper from './baseScraper.js';
export default class SriSriGheeScraper extends BaseScraper {
    constructor() { super('Sri Sri Tattva', 'https://www.srisritattva.com/collections/ghee-edible-oil', 'Ghee & Oils'); }
    async processCatalog(url) {
        const $ = await this.getPageContent(url);
        const links = [];
        $('a.grid-product__link').each((i, el) => links.push('https://www.srisritattva.com' + $(el).attr('href')));
        for (const link of links) await this.processProduct(link);
    }
    async extractProductData($, url) {
        let img = $('.product-single__photo img').attr('src');
        return {
            name: $('h1.product-single__title').text().trim(),
            description: $('.product-single__description').text().trim(),
            retail_price: parseFloat($('.product__price').first().text().replace(/[^\d.]/g, '')),
            imageUrl: img ? `https:${img}` : null
        };
    }
}
