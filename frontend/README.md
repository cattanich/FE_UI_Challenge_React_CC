# Beer E-Commerce Frontend

This is the frontend application for the Beer E-Commerce challenge. It implements a Product Listing Page (PLP) and a Product Details Page (PDP) for a mobile beer e-commerce application.

## Setup Instructions

1. Make sure the backend server is running first (see backend README.md)

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

The application will run on http://localhost:3000 by default.

## Pages

- **Product Listing Page (PLP)**: `/products` - Displays a list of beer products
- **Product Details Page (PDP)**: `/product/:id-:brand` - Shows detailed information for a specific product and allows size selection

## Features

- Responsive mobile design optimized for mobile devices
- Real-time stock and price updates (every 5 seconds)
- Product listing with beer information
- Product details with size variant selection
- Add to cart functionality (simulated with alerts)

## Implementation Notes

- The PLP is styled using styled-components as allowed by the requirements
- The PDP is styled using custom SASS (no UI libraries as per requirements)
- The application connects to the backend API for product and stock/price data
- Error handling is implemented with Window.alert() as specified in the requirements

## Testing the Application

1. Browse the product listing page to see all available beers
2. Click on a product to view its details
3. Select different size variants to see price and stock information
4. To test real-time updates, modify stock/price values in the backend's stock-price.js file and restart the backend server
5. Wait 5 seconds to see the updates reflected in the frontend
6. Try adding products to cart (this will show an alert with the selected product details)

## Code Structure

- `src/components`: Reusable UI components
- `src/pages`: Main application pages (PLP and PDP)
- `src/services`: API service for backend communication
- `src/styles`: CSS and SASS styling files
