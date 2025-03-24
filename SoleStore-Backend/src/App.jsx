import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      this.setState({
        products: data,
        loading: false
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false
      });
    }
  }

  render() {
    const { products, loading, error } = this.state;

    return (
      <>
        <div className="container">
          <h1>SoleStore Products API Test</h1>
          
          {loading && <p>Loading products...</p>}
          {error && <p className="error">Error: {error}</p>}
          
          <div className="products-list">
            {products.length > 0 ? (
              products.map(product => (
                <div key={product._id} className="product-card">
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category}</p>
                </div>
              ))
            ) : (
              !loading && <p>No products found</p>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default App