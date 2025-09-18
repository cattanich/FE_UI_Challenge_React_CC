import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product/:id-:brand" element={<ProductDetailsPage />} />
          <Route path="/" element={<Navigate to="/products" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
