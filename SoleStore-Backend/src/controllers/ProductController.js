import Product from '../models/Product.js';

export class ProductController {
  // Get all products
  static async getProducts(req, res) {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get products by category
  static async getProductsByCategory(req, res) {
    try {
      const { category } = req.params;
      const products = await Product.find({ category });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a product by ID
  static async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Create a new product
  static async createProduct(req, res) {
    try {
      const { name, price, category, description, image } = req.body;
      
      if (!name || !price || !category) {
        return res.status(400).json({ message: "Please provide name, price and category" });
      }
      
      const newProduct = new Product({
        name,
        price,
        category,
        description,
        image
      });
      
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a product
  static async updateProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete a product
  static async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}