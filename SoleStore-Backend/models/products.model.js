const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    images: { type: [String], required: true },
    colors: { type: [String], required: true },
    sizes: { type: [Number], required: true },
    category: { type: String, required: true },
    gender: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    description: { type: String, required: true },
    features: { type: [String], required: true },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    stock: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
