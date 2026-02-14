import PatanjaliScraper from './productScraper/patanjaliScraper.js';
import SriSriGheeScraper from './productScraper/srisriGheeScraper.js';
import SriSriSaltHoneyScraper from './productScraper/srisriSaltHoneyScraper.js';
import SriSriHoneyScraper from './productScraper/srisriHoneyScraper.js';
import SifiClapScraper from './productScraper/sifiClapScraper.js';
import SifiAllProductsScraper from './productScraper/sifiAllProductsScraper.js';
import KeyaScraper from './productScraper/keyaScraper.js';
import HimGoldScraper from './productScraper/himgoldScraper.js';

const scrapers = {
    patanjali: new PatanjaliScraper(),
    srisri_ghee: new SriSriGheeScraper(),
    srisri_salt: new SriSriSaltHoneyScraper(),
    srisri_honey: new SriSriHoneyScraper(),
    sifi_clap: new SifiClapScraper(),
    sifi_all: new SifiAllProductsScraper(),
    keya: new KeyaScraper(),
    himgold: new HimGoldScraper(),
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
