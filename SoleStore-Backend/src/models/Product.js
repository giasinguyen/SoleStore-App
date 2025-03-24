import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ["mens-sports", "mens-sandals", "mens-leather", 
           "womens-sports", "womens-sandals", "womens-heels"] 
  },
  description: { 
    type: String 
  },
  image: { 
    type: String 
  },
  inStock: { 
    type: Boolean, 
    default: true 
  },
  rating: { 
    type: Number, 
    default: 0 
  },
  numReviews: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;