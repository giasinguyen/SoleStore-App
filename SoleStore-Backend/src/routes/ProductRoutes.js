import express from 'express';
import { ProductController } from '../controllers/ProductController.js';

class ProductRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Routes for /api/products
    this.router.route('/')
      .get(ProductController.getProducts)
      .post(ProductController.createProduct);

    // Get products by category
    this.router.route('/category/:category')
      .get(ProductController.getProductsByCategory);

    this.router.route('/:id')
      .get(ProductController.getProductById)
      .put(ProductController.updateProduct)
      .delete(ProductController.deleteProduct);
  }

  getRouter() {
    return this.router;
  }
}

export default new ProductRoutes().getRouter();