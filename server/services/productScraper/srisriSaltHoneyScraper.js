import BaseScraper from './baseScraper.js';

export default class SriSriSaltHoneyScraper extends BaseScraper {
    constructor() {
        super('Sri Sri Tattva', 'https://www.srisritattva.com/collections/salt-sugar-jaggery-honey');
    }

    async processCatalog(url) {
        const $ = await this.getPageContent(url);
        const links = [];

        $('a.grid-product__link').each((i, el) => {
            let href = $(el).attr('href');
            if (href && !href.startsWith('http')) href = `https://www.srisritattva.com${href}`;
            links.push(href);
        });

        console.log(`[Sri Sri Salt] Found ${links.length} products.`);

        for (const link of links) {
            await this.processProduct(link);
        }
    }

    async extractProductData($, url) {
        const name = $('h1.product-single__title').text().trim();
        const description = $('.product-single__description').text().trim();
        const priceText = $('.product__price').first().text();
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        let imageUrl = $('.product-single__photo img').attr('src') || $('.product-single__photo').attr('data-photoswipe-src');

        if (imageUrl && imageUrl.startsWith('//')) imageUrl = `https:${imageUrl}`;

        return {
            name,
            description,
            retail_price: price,
            imageUrl,
            category: 'Salt, Sugar & Jaggery',
            brand: 'Sri Sri Tattva'
        };
    }
}
