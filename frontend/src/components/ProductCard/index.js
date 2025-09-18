import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the product card
const CardContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-right: 1rem;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductBrand = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const ProductStyle = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const ProductSubstyle = styled.p`
  font-size: 0.75rem;
  color: #888;
`;

const ProductABV = styled.div`
  font-size: 0.75rem;
  margin-top: auto;
  color: #555;
`;

const ProductCard = ({ product }) => {
  const { id, brand, image, style, substyle, abv } = product;
  
  // Format URL-friendly brand name
  const urlBrand = brand.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link to={`/product/${id}-${urlBrand}`}>
      <CardContainer>
        <ProductImage src={`http://localhost:5000${image}`} alt={brand} />
        <ProductInfo>
          <ProductBrand>{brand}</ProductBrand>
          <ProductStyle>{style}</ProductStyle>
          <ProductSubstyle>{substyle}</ProductSubstyle>
          <ProductABV>ABV: {abv}%</ProductABV>
        </ProductInfo>
      </CardContainer>
    </Link>
  );
};

export default ProductCard;
