import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SizeOption from '../../components/SizeOption';
import api from '../../services/api';
import '../../styles/ProductDetails.scss';

const ProductDetailsPage = () => {
  const { id, brand } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeData, setSizeData] = useState({});
  
  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await api.getProducts();
        const foundProduct = products.find(p => p.id === parseInt(id));
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Fetch initial stock and price data for all sizes
          const sizeDataObj = {};
          await Promise.all(
            foundProduct.sizes.map(async (size) => {
              try {
                const data = await api.getStockPrice(size.sku);
                sizeDataObj[size.sku] = data;
              } catch (err) {
                console.error(`Failed to fetch stock/price for SKU ${size.sku}:`, err);
                window.alert(`Error: Failed to fetch stock/price information for ${size.name}`);
              }
            })
          );
          
          setSizeData(sizeDataObj);
          setLoading(false);
        } else {
          setError('Product not found');
          setLoading(false);
          window.alert('Error: Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
        window.alert('Error: Failed to fetch product details');
      }
    };
    
    fetchProduct();
  }, [id]);
  
  // Update stock and price data every 5 seconds
  useEffect(() => {
    if (!product) return;
    
    const updateStockAndPrice = async () => {
      const updatedSizeData = { ...sizeData };
      let hasChanges = false;
      
      await Promise.all(
        product.sizes.map(async (size) => {
          try {
            const data = await api.getStockPrice(size.sku);
            
            // Check if data has changed
            if (
              !updatedSizeData[size.sku] ||
              updatedSizeData[size.sku].price !== data.price ||
              updatedSizeData[size.sku].stock !== data.stock
            ) {
              updatedSizeData[size.sku] = data;
              hasChanges = true;
            }
          } catch (err) {
            console.error(`Failed to update stock/price for SKU ${size.sku}:`, err);
          }
        })
      );
      
      if (hasChanges) {
        setSizeData(updatedSizeData);
      }
    };
    
    const intervalId = setInterval(updateStockAndPrice, 5000);
    
    return () => clearInterval(intervalId);
  }, [product, sizeData]);
  
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  
  const handleAddToCart = () => {
    if (selectedSize) {
      const sizeInfo = sizeData[selectedSize.sku];
      const formattedPrice = (sizeInfo.price / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      
      window.alert(`Added to cart: ${product.brand} - ${selectedSize.name} (${formattedPrice})`);
    }
  };
  
  if (loading) {
    return <div className="container">Loading product details...</div>;
  }
  
  if (error) {
    return <div className="container">Error: {error}</div>;
  }
  
  return (
    <div className="product-details">
      <Link to="/products" className="product-details__back">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="currentColor"/>
        </svg>
        Back to products
      </Link>
      
      <div className="product-details__header">
        <img 
          src={`http://localhost:5000${product.image}`} 
          alt={product.brand} 
          className="product-details__image" 
        />
        
        <div className="product-details__title-wrapper">
          <h1 className="product-details__brand">{product.brand}</h1>
          <div className="product-details__style">{product.style}</div>
          <div className="product-details__substyle">{product.substyle}</div>
        </div>
      </div>
      
      <div className="product-details__info-section">
        <h2 className="product-details__info-header">Product Info</h2>
        
        <div className="product-details__info-table">
          <div className="product-details__info-item">
            <span className="product-details__info-label">ABV</span>
            <span className="product-details__info-value">{product.abv}%</span>
          </div>
          
          <div className="product-details__info-item">
            <span className="product-details__info-label">Origin</span>
            <span className="product-details__info-value">{product.origin}</span>
          </div>
        </div>
        
        <p className="product-details__description">{product.information}</p>
      </div>
      
      <div className="product-details__sizes">
        <h2 className="product-details__size-header">Select Size</h2>
        
        <div className="product-details__size-options">
          {product.sizes.map(size => {
            const sizeInfo = sizeData[size.sku] || { price: 0, stock: 0 };
            const outOfStock = sizeInfo.stock <= 0;
            
            return (
              <SizeOption 
                key={size.sku}
                size={size}
                selected={selectedSize && selectedSize.sku === size.sku}
                outOfStock={outOfStock}
                price={sizeInfo.price}
                stock={sizeInfo.stock}
                onSelect={handleSizeSelect}
              />
            );
          })}
        </div>
      </div>
      
      <button 
        className="product-details__add-to-cart"
        disabled={!selectedSize || (sizeData[selectedSize?.sku]?.stock <= 0)}
        onClick={handleAddToCart}
      >
        <span>Add to Cart</span>
        {selectedSize && sizeData[selectedSize.sku] && (
          <span>
            {(sizeData[selectedSize.sku].price / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </span>
        )}
      </button>
    </div>
  );
};

export default ProductDetailsPage;
