import BaseScraper from './baseScraper.js';

export default class VavedaScraper extends BaseScraper {
    constructor() {
        super('Vevida Juices', 'https://vavedajuices.com/', 'Beverages');
    }

    async processCatalog(url) {
        const productPages = [
            'https://vavedajuices.com/products/aloe',
            'https://vavedajuices.com/products/majito-minty',
            'https://vavedajuices.com/products/mouser-energy-drink',
            'https://vavedajuices.com/products/katha-meetha-jeera',
            'https://vavedajuices.com/products/nata',
            'https://vavedajuices.com/products/kiddokid'
        ];

        for (const pageUrl of productPages) {
            await this.processCollectionPage(pageUrl);
        }
    }

    async processCollectionPage(url) {
        try {
            const $ = await this.getPageContent(url);
            // On Vaveda, product pages are often collections of flavors
            const collectionName = $('h1').first().text().trim();

            // Try to find individual flavor sections or list items
            // Based on structure observed, they use H2 for flavors
            const flavors = [];
            $('h2').each((i, el) => {
                const name = $(el).text().trim();
                const description = $(el).next('p').text().trim();
                const image = $(el).closest('div').find('img').attr('src');

                if (name && name.length < 50) {
                    flavors.push({
                        name: `${collectionName} - ${name}`,
                        description: description,
                        imageUrl: image ? (image.startsWith('http') ? image : `https://vavedajuices.com${image}`) : null,
                        retail_price: 20 // Default price as common for these drinks in India
                    });
                }
            });

            for (const productData of flavors) {
                await this.saveProduct(productData, url);
            }
        } catch (error) {
            console.error(`[Vevida] Error processing ${url}:`, error.message);
        }
    }

    async saveProduct(data, sourceUrl) {
        this.stats.found++;
        try {
            const [product, created] = await this.dbCreateOrUpdate(data, sourceUrl);
            if (created) this.stats.inserted++;
            else this.stats.updated++;
        } catch (error) {
            console.error(`[Vevida] Failed to save ${data.name}:`, error.message);
            this.stats.failed++;
        }
    }

    // Override processProduct since we extract multiple products from one page
    async processProduct(url) {
        // Not used as we call processCollectionPage directly
    }

    async dbCreateOrUpdate(data, sourceUrl) {
        const { Product, slugify, downloadImage } = await import('../../models/index.js').then(m => ({
            Product: m.Product,
            slugify: (t) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
            downloadImage: async (u, n) => {
                const { downloadImage } = await import('./scraperUtils.js');
                return downloadImage(u, n);
            }
        }));

        const existing = await Product.findOne({
            where: { name: data.name, BrandId: this.brandId }
        });

        let localImageUrl = existing ? existing.image_url : null;
        if (data.imageUrl && (!existing || !existing.image_url)) {
            localImageUrl = await downloadImage(data.imageUrl, data.name) || data.imageUrl;
        }

        const productData = {
            name: data.name,
            slug: data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
            description: data.description,
            retail_price: data.retail_price,
            BrandId: this.brandId,
            CategoryId: this.categoryId,
            image_url: localImageUrl,
            source_url: sourceUrl,
            last_synced_at: new Date()
        };

        if (existing) {
            await existing.update(productData);
            return [existing, false];
        } else {
            const created = await Product.create(productData);
            return [created, true];
        }
    }
}
