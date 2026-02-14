import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize, { connectDB } from '../utils/db.js';
import Product from '../models/productModel.js';
import ImportLog from '../models/importLogModel.js';
import { parsePDF } from '../utils/pdfParser.js';
import { extractProducts } from '../utils/productExtractor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Catalog Directory (assuming ../catalog relative to server root, or ../../catalog relative to script?)
// Script is in /server/scripts
// Catalog is in /catalog (root of workspace)
// So it is ../../catalog
const CATALOG_DIR = path.join(__dirname, '../../catalog');

const importCatalogs = async () => {
    console.log('Starting Catalog Import...');

    // Connect DB
    const connected = await connectDB();
    if (!connected) process.exit(1);

    // Sync specific models
    await Product.sync({ alter: true });
    await ImportLog.sync({ alter: true });
    console.log('Database Synced.');

    // Ensure catalog dir exists
    if (!fs.existsSync(CATALOG_DIR)) {
        console.error(`Catalog directory not found: ${CATALOG_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(CATALOG_DIR).filter(file => file.toLowerCase().endsWith('.pdf'));
    console.log(`Found ${files.length} PDF files.`);

    for (const file of files) {
        console.log(`Processing ${file}...`);
        const startTime = Date.now();
        const filePath = path.join(CATALOG_DIR, file);

        let inserted = 0;
        let duplicates = 0;
        let failed = 0;
        let detected = 0;

        try {
            // 1. Extract Text
            const text = await parsePDF(filePath);

            // 2. Extract Products
            const products = extractProducts(text, file);
            detected = products.length;
            console.log(`  Extracted ${detected} potential products.`);

            // 3. Insert into DB
            for (const p of products) {
                try {
                    // Check duplicate (Name + Brand)
                    // We can use findOrCreate or standard check
                    const existing = await Product.findOne({
                        where: {
                            name: p.name,
                            brand: p.brand
                        }
                    });

                    if (existing) {
                        duplicates++;
                        // Optional: Update price? User said "Skip insertion, Log as duplicate"
                        console.log(`  Duplicate: ${p.name}`);
                    } else {
                        await Product.create(p);
                        inserted++;
                    }
                } catch (err) {
                    failed++;
                    console.error(`  Failed to insert ${p.name}:`, err.message);
                }
            }

        } catch (err) {
            console.error(`  Error processing file ${file}:`, err.message);
            failed = detected; // Mark all as failed if file fails? Or just log error.
        }

        // 4. Log Import Result
        await ImportLog.create({
            filename: file,
            total_detected: detected,
            inserted_count: inserted,
            duplicate_count: duplicates,
            failed_count: failed,
            import_date: new Date()
        });

        console.log(`  Finished ${file}: ${inserted} inserted, ${duplicates} duplicates, ${failed} failed.`);
    }

    console.log('All imports completed.');
    process.exit(0);
};

importCatalogs();
