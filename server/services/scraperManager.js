import PatanjaliScraper from './productScraper/patanjaliScraper.js';
import SriSriGheeScraper from './productScraper/srisriGheeScraper.js';
import SriSriSaltHoneyScraper from './productScraper/srisriSaltHoneyScraper.js';
import SriSriHoneyScraper from './productScraper/srisriHoneyScraper.js';
import SifiClapScraper from './productScraper/sifiClapScraper.js';
import SifiAllProductsScraper from './productScraper/sifiAllProductsScraper.js';
import KeyaScraper from './productScraper/keyaScraper.js';
import HimGoldScraper from './productScraper/himGoldScraper.js';

const scrapers = {
    patanjali: new PatanjaliScraper(),
    srisriGhee: new SriSriGheeScraper(),
    srisriSaltHoney: new SriSriSaltHoneyScraper(),
    srisriHoney: new SriSriHoneyScraper(),
    sifiClap: new SifiClapScraper(),
    sifiAllProducts: new SifiAllProductsScraper(),
    keya: new KeyaScraper(),
    himGold: new HimGoldScraper(),
};

export const runScraper = async (key) => {
    const scraper = scrapers[key.toLowerCase()];
    if (!scraper) throw new Error(`Scraper for ${key} not found`);
    return await scraper.scrape();
};

export const runAllScrapers = async () => {
    const results = [];
    for (const key of Object.keys(scrapers)) {
        try {
            await scrapers[key].scrape();
            results.push({ brand: key, status: 'Completed' });
        } catch (error) {
            console.error(`Error running ${key}:`, error);
            results.push({ brand: key, status: 'Failed', error: error.message });
        }
    }
    return results;
};
