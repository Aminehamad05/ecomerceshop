import express from 'express';
import Product from '../models/product.model.js';
import { createProducts } from '../controller/product.controller.js';
import { deleteProducts } from '../controller/product.controller.js';
import { getProducts } from '../controller/product.controller.js';
import { updateProducts } from '../controller/product.controller.js';
const router = express.Router();
router.post('/',createProducts)
router.delete('/:id', deleteProducts)
router.get('/',getProducts)
router.put('/:id',updateProducts)
export default router;