const detectPrice = (text) => {
    // Regex for ₹ or Rs. followed by digits, optional decimals
    const priceRegex = /(?:₹|Rs\.?)\s*([\d,]+(?:\.\d{2})?)/gi;
    const matches = [...text.matchAll(priceRegex)];
    return matches.map(m => ({
        full: m[0],
        value: parseFloat(m[1].replace(/,/g, '')),
        index: m.index
    }));
};

const cleanText = (text) => {
    return text
        .replace(/\r\n/g, '\n')
        .replace(/\f/g, '') // remove form feed
        .replace(/Page \d+/gi, '') // remove page numbers
        .replace(/\s+/g, ' ') // collapse spaces
        .trim();
};

export const extractProducts = (rawText, filename) => {
    const products = [];

    // Heuristic: Split by double newlines or prices?
    // User strategy: "Split product blocks based on price pattern"

    // 1. Find all prices
    const prices = detectPrice(rawText);

    if (prices.length === 0) {
        return [];
    }

    let lastIndex = 0;

    prices.forEach((priceMatch, i) => {
        // The text for this product likely ends at the price match, 
        // and starts after the previous price match.
        // We capture a buffer window around it? 
        // Usually: [Name] [Desc] [Price]

        // Let's define the block as: lastIndex to priceMatch.index
        let block = rawText.substring(lastIndex, priceMatch.index).trim();

        // If the block is empty (e.g. adjacent prices), it might be a variance. 
        // For now, treat as separate if block has content.

        if (block.length > 5) {
            // Extract details from block
            const lines = block.split('\n').map(l => l.trim()).filter(l => l);

            // Name is usually the first non-empty line
            // But we need to be careful of headers.

            // Simplest approach: Take the last few lines before the price?
            // Or the whole block? "Split product blocks based on price pattern"

            // Let's take the whole block as description + name
            const nameEndpoint = Math.min(lines.length, 1);
            const name = lines.slice(0, nameEndpoint).join(' '); // First line is name
            const description = lines.slice(nameEndpoint).join(' '); // Rest is desc

            // Try to find SKU in the block?
            // Regex for SKU: alphanumeric, maybe "SKU: ..."
            const skuMatch = block.match(/SKU[:\s]+([\w-]+)/i);
            const sku = skuMatch ? skuMatch[1] : null;

            const product = {
                name: cleanText(name), // Clean name
                description: cleanText(description),
                retail_price: priceMatch.value,
                brand: extractBrand(filename, block), // Detect brand from filename or block
                category: extractCategory(block) || 'General',
                sku: sku,
                // Bulk price? If multiple prices exist?
                // For now, map extracted price to retail_price
            };

            if (product.name) products.push(product);
        }

        // Update lastIndex to be after this price match
        // But what if there is text AFTER price (e.g. weight)?
        // "MRP: 500 1kg"
        // The weight might be after.
        // We usually assume the next block starts after the current price line.
        // Let's find the newline after the price.
        const newlineAfter = rawText.indexOf('\n', priceMatch.index);
        lastIndex = newlineAfter !== -1 ? newlineAfter : priceMatch.index + priceMatch.full.length;
    });

    return products;
};

const extractBrand = (filename, block) => {
    // Determine brand from filename (e.g. "Patanjali_Catalog.pdf")
    const filenameBase = filename.split(/[_\-\.]/)[0];
    return filenameBase || "Unknown";
};

const extractCategory = (block) => {
    if (block.toLowerCase().includes('soap')) return 'Personal Care';
    if (block.toLowerCase().includes('biscuit')) return 'Food';
    if (block.toLowerCase().includes('oil')) return 'Kitchen';
    return null;
};
