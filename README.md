# React Beer E-Commerce Challenge

This project implements a beer e-commerce web application for mobile devices using JavaScript and React. It consists of two main pages:

1. **Product Listing Page (PLP)**: Displays a list of beer products
2. **Product Details Page (PDP)**: Shows detailed information for each product and allows users to view price and inventory for different size variants

## Project Structure

The project is divided into two separate parts:

- **Frontend**: React application with PLP and PDP pages
- **Backend**: Simple API server that provides product data and stock/price information

Each part has its own folder and package.json file for independent management.

## Challenge Requirements Implemented

- PLP is served at `/products`
- PDP is served at `/product/productId-productBrand` (e.g., `/product/127-modelo-especial`)
- PDP checks for updated stock and price information every 5 seconds
- PLP uses styled-components for styling
- PDP uses custom SASS styling (no UI libraries)
- Error messages are shown using Window.alert()
- "Add to cart" CTA displays a Window.alert() with relevant information
- Code is organized in a modular, maintainable way

## Backend API Endpoints

- `GET /api/products`: Returns list of all products and their details
- `GET /api/stock-price/:sku`: Returns price and stock information for a specific product variant

## Getting Started

To run the complete application, you need to start both the backend and frontend servers:

1. **Backend Setup**:
   ```
   cd backend
   npm install
   
   # Add product images to the public/images directory (see backend README.md)
   
   npm start
   ```
   The backend server will run on http://localhost:5000

2. **Frontend Setup**:
   ```
   cd frontend
   npm install
   npm start
   ```
   The frontend application will run on http://localhost:3000

## Detailed Documentation

For more detailed information about setup, implementation, and testing:

- See [frontend/README.md](./frontend/README.md) for frontend documentation
- See [backend/README.md](./backend/README.md) for backend documentation
