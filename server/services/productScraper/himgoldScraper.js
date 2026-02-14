import BaseScraper from './baseScraper.js';

export default class HimGoldScraper extends BaseScraper {
    constructor() {
        super('Him Spices', 'https://www.himspices.com/allProducts', { usePuppeteer: true }); // Dynamic site likelihood
    }

    async processCatalog(url) {
        // Likely dynamic since it's /allProducts (Single Page App often)
        const $ = await this.getPageContent(url);
        const links = [];

        // Generic selector for product links in grid
        $('a[href*="/product/"]').each((i, el) => {
            let href = $(el).attr('href');
            if (href && !href.startsWith('http')) href = `https://www.himspices.com${href}`;
            links.push(href);
        });

        console.log(`[Him Spices] Found ${links.length} products.`);

        for (const link of links) {
            await this.processProduct(link);
        }
    }

    async extractProductData($, url) {
        const name = $('h1').first().text().trim();
        const description = $('div[class*="description"]').text().trim();
        const priceText = $('[class*="price"]').text();
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        const imageUrl = $('img[class*="ProductImage"]').attr('src');

        return {
            name,
            description,
            retail_price: isNaN(price) ? null : price,
            imageUrl,
            category: 'Spices',
            brand: 'Himgold'
        };
    }
}
