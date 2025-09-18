# Beer E-Commerce Backend

This is the backend server for the Beer E-Commerce challenge. It provides API endpoints for product data and stock/price information.

## Setup Instructions

1. Install dependencies:
```
npm install
```

2. Add product images to the `public/images` directory:
   - modelo-especial.png
   - corona-extra.png
   - heineken.png
   - stella-artois.png
   - guinness.png
   - sierra-nevada.png
   - blue-moon.png
   - dogfish-head.png

3. Start the server:
```
npm start
```

The server will run on http://localhost:5000 by default.

## API Endpoints

- `GET /api/products`: Returns a list of all products and their details
- `GET /api/stock-price/:sku`: Returns price and inventory information for a specific product variant identified by SKU

## Development

- The server is built with Express.js
- Product data is loaded from `products.js`
- Stock and price data is loaded from `stock-price.js`
- Static files (images) are served from the `public` directory

## Testing Real-Time Updates

- To test the 5-second update requirement in the frontend, you can modify price and stock values in `stock-price.js` and restart the server
- For convenience, you can use the provided utility script:
  ```
  node update-stock.js <sku> <stock> <price>
  
  # Example: Set SKU 10041 to have 5 items in stock and a price of $10.99
  node update-stock.js 10041 5 1099
  ```
- After running the script, restart the server to apply the changes
- For example, change the stock level of a product to test out-of-stock behavior
- Remember that prices are stored in cents (e.g., 999 = $9.99)

## Notes

- The server does not detect changes to `stock-price.js` automatically - you must restart the server for changes to take effect
- This is a simplified backend for demonstration purposes
