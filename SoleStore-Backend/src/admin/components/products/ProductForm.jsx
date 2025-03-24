import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: 0,
    originalPrice: 0,
    category: '',
    description: '',
    stock: 0,
    images: [],
    colors: [],
    sizes: [],
    gender: 'Men',
    isFeatured: false,
    isNewArrival: false,
    bestSeller: false
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  
  // Initialize form with product data when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        brand: product.brand || '',
        price: product.price || 0,
        originalPrice: product.originalPrice || 0,
        category: product.category || '',
        description: product.description || '',
        stock: product.stock || 0,
        images: product.images || [],
        colors: product.colors || [],
        sizes: product.sizes || [],
        gender: product.gender || 'Men',
        isFeatured: product.isFeatured || false,
        isNewArrival: product.isNewArrival || false,
        bestSeller: product.bestSeller || false
      });
    }
  }, [product]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : Number(value)
    }));
  };
  
  const addImageUrl = () => {
    if (imageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()]
      }));
      setImageUrl('');
    }
  };
  
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };
  
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.brand.trim()) errors.brand = 'Brand is required';
    if (formData.price <= 0) errors.price = 'Price must be greater than 0';
    if (!formData.category.trim()) errors.category = 'Category is required';
    if (formData.stock < 0) errors.stock = 'Stock cannot be negative';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${validationErrors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${validationErrors.brand ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.brand && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.brand}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${validationErrors.category ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Category</option>
              <option value="mens-sports">Men's Sports</option>
              <option value="mens-sandals">Men's Sandals</option>
              <option value="mens-leather">Men's Leather</option>
              <option value="womens-sports">Women's Sports</option>
              <option value="womens-sandals">Women's Sandals</option>
              <option value="womens-heels">Women's Heels</option>
            </select>
            {validationErrors.category && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.category}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>
        
        {/* Pricing & Stock */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleNumberChange}
              min="0"
              step="0.01"
              className={`w-full p-2 border rounded-md ${validationErrors.price ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.price && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.price}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Price ($)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleNumberChange}
              min="0"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleNumberChange}
              min="0"
              className={`w-full p-2 border rounded-md ${validationErrors.stock ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.stock && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.stock}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Flags</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="isFeatured">Featured Product</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isNewArrival"
                  name="isNewArrival"
                  checked={formData.isNewArrival}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="isNewArrival">New Arrival</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="bestSeller"
                  name="bestSeller"
                  checked={formData.bestSeller}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="bestSeller">Best Seller</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>
      
      {/* Images */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
        <div className="flex">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="flex-1 p-2 border border-gray-300 rounded-l-md"
          />
          <button
            type="button"
            onClick={addImageUrl}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
        
        {formData.images.length > 0 && (
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            {formData.images.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Product ${index}`}
                  className="h-24 w-full object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150?text=Image+Error";
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          {product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;