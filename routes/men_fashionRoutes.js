import express from 'express';
import { getMenFashionCategories, getMenFashionItemById, getMenFashionItems } from '../controllers/men_fashionCtrl.js';
import auth from '../middlewares/auth.js';

const router = express.Router();


router.get('/', auth, getMenFashionCategories);
router.get('/get-menfashion-item', auth, getMenFashionItems)
router.get('/:id', auth, getMenFashionItemById);

export default router;