import express from 'express';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

// Public gateway GET endpoint mapping directly to the getProducts controller function
// Since this router is mounted on '/api/products' in server.js, '/' maps to '/api/products'
router.get('/', getProducts);

export default router;
