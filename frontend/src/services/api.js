import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// API service for interacting with the backend
const api = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  // Get stock and price information for a specific SKU
  getStockPrice: async (sku) => {
    try {
      const response = await axios.get(`${API_URL}/stock-price/${sku}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stock/price for SKU ${sku}:`, error);
      throw error;
    }
  }
};

export default api;
