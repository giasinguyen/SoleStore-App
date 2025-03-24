import express from 'express';

const router = express.Router();

// GET all orders
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Orders API working',
    data: [] // Will be replaced with real data later
  });
});

// GET order by ID
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Order ${req.params.id} found`,
    data: {
      id: req.params.id,
      status: 'pending',
      total: 123.45,
      date: new Date().toISOString()
    }
  });
});

// POST create new order
router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: {
      id: 'new-order-123',
      ...req.body
    }
  });
});

export default router;