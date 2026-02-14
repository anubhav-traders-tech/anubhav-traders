import express from 'express';
import { runScraper, runAllScrapers } from '../services/scraperManager.js';
import SyncLog from '../models/syncLogModel.js';

const router = express.Router();

// Trigger specific scraper
router.post('/scrape/:key', async (req, res) => {
    const { key } = req.params;
    try {
        // Run in background
        runScraper(key).catch(err => console.error(`Background scrape failed for ${key}:`, err));

        res.json({ message: `Scraping started for ${key}. Check logs for progress.` });
    } catch (error) {
        res.status(400).json({ error: error.message, available_keys: ['patanjali', 'srisri_ghee', 'srisri_salt', 'srisri_honey', 'sifi_clap', 'sifi_all', 'keya', 'himgold'] });
    }
});

// Trigger all scrapers
router.post('/scrape-all', async (req, res) => {
    try {
        runAllScrapers().catch(err => console.error('Background scrape-all failed:', err));
        res.json({ message: 'Full sync started. This may take a while.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Sync Logs
router.get('/logs', async (req, res) => {
    try {
        const logs = await SyncLog.findAll({ order: [['run_date', 'DESC']], limit: 50 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
