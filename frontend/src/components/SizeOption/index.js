import React from 'react';

// Component for displaying size options on the product details page
const SizeOption = ({ size, selected, outOfStock, price, stock, onSelect }) => {
  // Format price from cents to dollars
  const formattedPrice = (price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  
  const handleClick = () => {
    if (!outOfStock) {
      onSelect(size);
    }
  };
  
  return (
    <div 
      className={`product-details__size-option ${selected ? 'product-details__size-option--selected' : ''} ${outOfStock ? 'product-details__size-option--out-of-stock' : ''}`}
      onClick={handleClick}
    >
      <div>
        <div className="product-details__size-name">{size.name}</div>
        <div className="product-details__size-stock">
          {outOfStock ? 'Out of stock' : `${stock} in stock`}
        </div>
      </div>
      <div className="product-details__size-price">{formattedPrice}</div>
    </div>
  );
};

export default SizeOption;
