import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    default: 0
  },
  originalPrice: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  images: [String],
  colors: [String],
  sizes: [Number],
  category: String,
  gender: {
    type: String,
    enum: ['Men', 'Women', 'Unisex']
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    default: 0
  },
  description: String,
  features: [String],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  bestSeller: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;