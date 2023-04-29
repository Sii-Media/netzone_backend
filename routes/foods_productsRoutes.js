import express from 'express';
import { getFoodById, getFoodsCategories, getFoodsItems } from '../controllers/foods_productsModel.js';

const router = express.Router();

router.get('/', getFoodsCategories);
router.get('/food-items', getFoodsItems);
router.get('/:id', getFoodById);


export default router;