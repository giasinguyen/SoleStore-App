import React, { useState, useEffect } from 'react';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const isEditMode = Boolean(currentProduct);
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setShowModal(true);
  };
  
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };
  
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await deleteProduct(productId);
      // Refresh products list
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleSaveProduct = async (productData) => {
    try {
      if (isEditMode) {
        await updateProduct(currentProduct._id, productData);
      } else {
        await createProduct(productData);
      }
      
      // Refresh and reset
      loadProducts();
      setShowModal(false);
      setCurrentProduct(null);
      
    } catch (err) {
      setError(err.message);
    }
  };
  
  // Filter products by search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
        <Button onClick={handleAddProduct} color="primary">
          <i className="fas fa-plus mr-2"></i> Add Product
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="pl-10 w-full border border-gray-300 rounded-md p-2"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">All Categories</option>
              <option value="mens-sports">Men's Sports</option>
              <option value="mens-sandals">Men's Sandals</option>
              <option value="mens-leather">Men's Leather</option>
              <option value="womens-sports">Women's Sports</option>
              <option value="womens-sandals">Women's Sandals</option>
              <option value="womens-heels">Women's Heels</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <i className="fas fa-spinner fa-spin text-2xl text-indigo-600"></i>
          <p className="mt-2">Loading products...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          <p>{error}</p>
        </div>
      ) : (
        <ProductList 
          products={filteredProducts} 
          onEdit={handleEditProduct} 
          onDelete={handleDeleteProduct} 
        />
      )}
      
      {/* Product Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title={isEditMode ? 'Edit Product' : 'Add New Product'}
      >
        <ProductForm 
          product={currentProduct}
          onSave={handleSaveProduct}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductsPage;