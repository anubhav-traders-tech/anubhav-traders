import BaseScraper from './baseScraper.js';

export default class SriSriScraper extends BaseScraper {
    constructor() {
        super('Sri Sri Tattva', 'https://www.srisritattva.com/collections/all');
    }

    async processCatalog(url) {
        // Shopify structure usually
        const $ = await this.getPageContent(url);
        const links = [];

        $('a.grid-product__link').each((i, el) => {
            const href = $(el).attr('href');
            if (href) links.push(`https://www.srisritattva.com${href}`);
        });

        console.log(`[Sri Sri] Found ${links.length} products.`);

        for (const link of links) {
            await this.processProduct(link);
        }
    }

    async extractProductData($, url) {
        const name = $('h1.product-single__title').text().trim();
        const description = $('div.product-single__description').text().trim();
        const priceWrapper = $('span.product__price').first().text();
        const price = parseFloat(priceWrapper.replace(/[^\d.]/g, ''));
        const imageUrl = $('div.product-single__photo img').attr('src');
        const mkImage = imageUrl ? (imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl) : null;

        return {
            name,
            description,
            retail_price: price,
            imageUrl: mkImage,
            category: 'Wellness',
            sku: null
        };
    }
}
