import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const UPLOAD_DIR = path.join(__dirname, '../../uploads/products');
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const downloadImage = async (url, filenamePrefix) => {
    try {
        if (!url) return null;

        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        // Infer extension or default to .jpg
        let ext = path.extname(url).split('?')[0] || '.jpg';
        if (ext.length > 5) ext = '.jpg'; // Safety check

        const filename = `${filenamePrefix.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}${ext}`;
        const filePath = path.join(UPLOAD_DIR, filename);

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(`/uploads/products/${filename}`));
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Failed to download image from ${url}:`, error.message);
        return null;
    }
};

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
