import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';

// Load environment variables
dotenv.config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  setupRoutes() {
    // Root route
    this.app.get('/', (req, res) => {
      res.send('Welcome to SoleStore API');
    });

    // API routes
    this.app.use('/api/products', productRoutes);
  }

  async start() {
    try {
      await connectDB();
      this.app.listen(this.port, () => {
        console.log(`Server running on http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error(`Error starting server: ${error.message}`);
      process.exit(1);
    }
  }
}

// Initialize and start the server
const server = new Server();
server.start();