import BaseScraper from './baseScraper.js';

export default class PatanjaliScraper extends BaseScraper {
    constructor() {
        super('Patanjali', 'https://patanjaliglobal.org/category/pooja-essentials');
    }

    async processCatalog(url) {
        const $ = await this.getPageContent(url);
        const links = [];

        // Selectors for Patanjali Global (WooCommerce/Custom)
        // Adjusting selectors based on common structures for this site
        $('.product-layout .product-thumb .image a').each((i, el) => {
            links.push($(el).attr('href'));
        });

        console.log(`[Patanjali] Found ${links.length} products.`);

        for (const link of links) {
            if (link) await this.processProduct(link);
        }
    }

    async extractProductData($, url) {
        const name = $('h1.title').first().text().trim();
        const description = $('#tab-description').text().trim() || $('div.description').text().trim();
        const priceText = $('.price .price-new').text().trim() || $('.price').first().text().trim();
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        const imageUrl = $('#product-zoom').attr('src') || $('.thumbnails img').first().attr('src');

        return {
            name,
            description,
            retail_price: isNaN(price) ? null : price,
            imageUrl,
            category: 'Pooja Essentials',
            brand: 'Patanjali'
        };
    }
}
