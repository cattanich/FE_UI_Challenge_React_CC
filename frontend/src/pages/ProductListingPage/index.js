import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard';
import api from '../../services/api';

// Styled components for the product listing page
const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.header`
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #666;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LoadingText = styled.p`
  text-align: center;
  padding: 2rem 0;
  color: #666;
`;

const ErrorText = styled.p`
  text-align: center;
  padding: 2rem 0;
  color: #d32f2f;
`;

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
        window.alert('Error: Failed to fetch products');
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <Container>
      <Header>
        <Title>Our Beers</Title>
        <Subtitle>Discover our selection of premium beers</Subtitle>
      </Header>
      
      {loading ? (
        <LoadingText>Loading products...</LoadingText>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <ProductList>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductList>
      )}
    </Container>
  );
};

export default ProductListingPage;
