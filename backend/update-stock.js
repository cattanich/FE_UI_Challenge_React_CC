/**
 * This script helps you update stock levels or prices in the stock-price.js file
 * for testing the real-time update feature of the frontend.
 * 
 * Usage: node update-stock.js <sku> <stock> <price>
 * 
 * Example: node update-stock.js 10041 5 1099
 * This will update SKU 10041 to have 5 items in stock and a price of $10.99
 * 
 * Note: After running this script, you need to restart the server for changes to take effect.
 */

const fs = require('fs');
const path = require('path');
const stockPricePath = path.join(__dirname, 'stock-price.js');

// Get arguments from command line
const sku = process.argv[2];
const stock = parseInt(process.argv[3]);
const price = parseInt(process.argv[4]);

// Validate arguments
if (!sku || isNaN(stock) || isNaN(price)) {
  console.error('Error: Please provide valid SKU, stock, and price values.');
  console.log('Usage: node update-stock.js <sku> <stock> <price>');
  console.log('Example: node update-stock.js 10041 5 1099');
  process.exit(1);
}

// Read the current stock-price.js file
fs.readFile(stockPricePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading stock-price.js file:', err);
    process.exit(1);
  }

  // Find the entry for the specified SKU
  const skuRegex = new RegExp(`${sku}:\\s*{\\s*price:\\s*\\d+,\\s*stock:\\s*\\d+\\s*}`);
  const match = data.match(skuRegex);

  if (!match) {
    console.error(`Error: SKU ${sku} not found in stock-price.js`);
    process.exit(1);
  }

  // Update the entry with new values
  const updatedData = data.replace(
    skuRegex,
    `${sku}: { price: ${price}, stock: ${stock} }`
  );

  // Write the updated content back to the file
  fs.writeFile(stockPricePath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to stock-price.js file:', err);
      process.exit(1);
    }

    console.log(`Updated SKU ${sku}:`);
    console.log(`- Stock: ${stock} items`);
    console.log(`- Price: $${(price / 100).toFixed(2)}`);
    console.log('\nRemember to restart the server for changes to take effect!');
  });
});
