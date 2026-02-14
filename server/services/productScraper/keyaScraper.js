import BaseScraper from './baseScraper.js';
export default class KeyaScraper extends BaseScraper {
    constructor() { super('Keya', 'https://keyafoods.com/collections/all', 'Food & Spices'); }
    async processCatalog(url) {
        const $ = await this.getPageContent(url);
        const links = [];
        $('.product-card a').each((i, el) => links.push('https://keyafoods.com' + $(el).attr('href')));
        for (const link of links) await this.processProduct(link);
    }
    async extractProductData($, url) {
        let img = $('.product-single__photo img').attr('src');
        return {
            name: $('h1.h2').text().trim(),
            description: $('.product-single__description').text().trim(),
            retail_price: parseFloat($('.product__price').first().text().replace(/[^\d.]/g, '')),
            imageUrl: img ? `https:${img}` : null
        };
    }
}
