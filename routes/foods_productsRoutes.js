import express from 'express';
import { getFoodById, getFoodsCategories, getFoodsItems } from '../controllers/foods_productsModel.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, getFoodsCategories);
router.get('/food-items', auth, getFoodsItems);
router.get('/:id', auth, getFoodById);


export default router;