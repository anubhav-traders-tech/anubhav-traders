import cron from 'node-cron';
import { runAllScrapers } from '../services/scraperManager.js';

// Schedule: At 00:00 on Sunday (Weekly)
const job = cron.schedule('0 0 * * 0', async () => {
    console.log('Running Weekly Product Sync...');
    await runAllScrapers();
    console.log('Weekly Product Sync Completed.');
});

export default job;
