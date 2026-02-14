import BaseScraper from './baseScraper.js';
export default class PatanjaliScraper extends BaseScraper {
    constructor() { super('Patanjali', 'https://patanjaliglobal.org/category/pooja-essentials', 'Pooja Essentials'); }
    async processCatalog(url) {
        const $ = await this.getPageContent(url);
        const links = [];
        $('.product-layout .image a').each((i, el) => links.push($(el).attr('href')));
        for (const link of links) await this.processProduct(link);
    }
    async extractProductData($, url) {
        return {
            name: $('h1.title').text().trim(),
            description: $('#tab-description').text().trim(),
            retail_price: parseFloat($('.price-new').text().replace(/[^\d.]/g, '')) || null,
            imageUrl: $('#product-zoom').attr('src')
        };
    }
}
