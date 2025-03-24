import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import process from 'process';
import productRoutes from './routes/ProductRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { MONGODB_URI, PORT } from './config/config.js';

// Get the directory name from the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try multiple ways to load environment variables
// 1. Try standard loading
dotenv.config();
// 2. Try loading from parent directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
// 3. Try loading from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// 4. Manual loading as last resort
try {
  const envPath = path.resolve(__dirname, '../.env');
  console.log('Looking for .env file at:', envPath);
  
  if (fs.existsSync(envPath)) {
    console.log('.env file found!');
    const envConfig = fs.readFileSync(envPath, 'utf8')
      .split('\n')
      .filter(line => line.trim() !== '' && !line.startsWith('#'))
      .map(line => line.split('='));
      
    for (const [key, value] of envConfig) {
      if (!process.env[key]) {
        process.env[key] = value.trim();
      }
    }
  } else {
    console.log('.env file not found at expected location');
  }
} catch (error) {
  console.error('Error reading .env file:', error);
}

// Debug environment variables
console.log('Environment variables after loading:');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    // Use hardcoded URI as fallback if environment variable is not loaded
    const uri = process.env.MONGO_URI || "mongodb+srv://products:SoleStore%402025@solestore.ewe4m.mongodb.net/solestore_db?retryWrites=true&w=majority&appName=SoleStore";
    
    console.log("Connecting to MongoDB with URI:", uri);
    
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Test route
app.get('/api', (req, res) => {
  res.send('API is running...');
});

// Set port - use fallback if environment variable is not set
const SERVER_PORT = process.env.PORT || 5000;

// Start server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});