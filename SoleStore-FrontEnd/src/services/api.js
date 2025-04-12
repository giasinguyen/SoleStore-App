import axios from 'axios';

// API URL
const API_BASE_URL = 'http://localhost:3000';

// Tạo một instance axios với cấu hình chung
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productAPI = {
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      throw error;
    }
  },
  
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm có id ${id}:`, error);
      throw error;
    }
  },
  
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/products?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm theo danh mục ${category}:`, error);
      throw error;
    }
  }
};

// Blogs API
export const blogAPI = {
  getAllBlogs: async () => {
    try {
      const response = await api.get('/blogs');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bài viết:', error);
      throw error;
    }
  },
  
  getBlogById: async (id) => {
    try {
      const response = await api.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy bài viết có id ${id}:`, error);
      throw error;
    }
  }
};

// Reviews API
export const reviewAPI = {
  getAllReviews: async () => {
    try {
      const response = await api.get('/reviews');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy đánh giá:', error);
      throw error;
    }
  },
  
  addReview: async (reviewData) => {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi thêm đánh giá:', error);
      throw error;
    }
  }
};

// Accounts API
export const accountAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/accounts/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/accounts/register', userData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      throw error;
    }
  },
  
  updateAccount: async (id, userData) => {
    try {
      const response = await api.put(`/accounts/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật tài khoản:', error);
      throw error;
    }
  }
};

// Cart API
export const cartAPI = {
  getCart: async (userId) => {
    try {
      const response = await api.get(`/cart/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
      throw error;
    }
  },
  
  addToCart: async (cartData) => {
    try {
      const response = await api.post('/cart', cartData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      throw error;
    }
  },
  
  updateCartItem: async (id, data) => {
    try {
      const response = await api.put(`/cart/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm trong giỏ hàng:', error);
      throw error;
    }
  },
  
  removeFromCart: async (id) => {
    try {
      const response = await api.delete(`/cart/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
      throw error;
    }
  }
};

export default api;