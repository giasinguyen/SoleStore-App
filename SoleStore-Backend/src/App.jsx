import React, { Component } from 'react';
import AdminApp from './admin/AdminApp';
import './App.css';
import './index.css';  // Make sure to import the Tailwind CSS

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      error: null,
      showAdmin: true  // Set to true to show admin dashboard by default
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

  toggleView = () => {
    this.setState(prevState => ({
      showAdmin: !prevState.showAdmin
    }));
  }

  render() {
    const { products, loading, error, showAdmin } = this.state;

    return (
      <>
        <button 
          onClick={this.toggleView} 
          className="fixed top-4 right-4 z-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showAdmin ? 'View Products' : 'View Admin Dashboard'}
        </button>
        
        {showAdmin ? (
          <AdminApp />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">SoleStore Products</h1>
            
            {loading && <p className="text-center">Loading products...</p>}
            {error && <p className="text-red-500 text-center">Error: {error}</p>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map(product => (
                  <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-5">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-gray-700 mt-2">Price: ${product.price}</p>
                      <p className="text-gray-500 mt-1">Category: {product.category}</p>
                    </div>
                  </div>
                ))
              ) : (
                !loading && <p className="col-span-full text-center">No products found</p>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default App;