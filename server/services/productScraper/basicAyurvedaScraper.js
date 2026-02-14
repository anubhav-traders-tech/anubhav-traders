import BaseScraper from './baseScraper.js';

export default class BasicAyurvedaScraper extends BaseScraper {
    constructor() {
        super('Basic Ayurveda', 'https://basicayurveda.org/collections/all');
    }

    async processCatalog(url) {
        const $ = await this.getPageContent(url);
        const links = [];

        $('.product-grid-item a').each((i, el) => {
            const href = $(el).attr('href');
            if (href) links.push(`https://basicayurveda.org${href}`);
        });

        for (const link of links) {
            await this.processProduct(link);
        }
    }

    async extractProductData($, url) {
        return {
            name: $('h1.product-name').text().trim(),
            description: $('.product-description').text().trim(),
            retail_price: parseFloat($('.product-price').text().replace(/[^\d.]/g, '')),
            imageUrl: $('#ProductPhotoImg').attr('src'),
            category: 'Ayurveda',
        };
    }
}
