const express = require('express');
const cors = require('cors');
const products = require('./products');
const stockPrice = require('./stock-price');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes
// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get stock and price information for a specific SKU
app.get('/api/stock-price/:sku', (req, res) => {
  const { sku } = req.params;
  
  if (!stockPrice[sku]) {
    return res.status(404).json({ error: 'SKU not found' });
  }
  
  res.json(stockPrice[sku]);
});

// Serve images from the public directory
app.use('/images', express.static('public/images'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
