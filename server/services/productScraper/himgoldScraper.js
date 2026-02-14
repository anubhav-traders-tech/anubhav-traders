import BaseScraper from './baseScraper.js';
export default class HimGoldScraper extends BaseScraper {
    constructor() { super('Himgold', 'https://www.himspices.com/allProducts', 'Spices', { usePuppeteer: true }); }
    async processCatalog(url) {
        const $ = await this.getPageContent(url);
        const links = [];
        $('a[href*="/product/"]').each((i, el) => links.push('https://www.himspices.com' + $(el).attr('href')));
        for (const link of links) await this.processProduct(link);
    }
    async extractProductData($, url) {
        return {
            name: $('h1').first().text().trim(),
            description: $('div[class*="description"]').text().trim(),
            retail_price: parseFloat($('[class*="price"]').text().replace(/[^\d.]/g, '')),
            imageUrl: $('img[class*="ProductImage"]').attr('src')
        };
    }
}
