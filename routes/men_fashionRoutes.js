import express from 'express';
import { getMenFashionCategories, getMenFashionItemById, getMenFashionItems } from '../controllers/men_fashionCtrl.js';

const router = express.Router();


router.get('/', getMenFashionCategories);
router.get('/get-menfashion-item', getMenFashionItems)
router.get('/:id', getMenFashionItemById);

export default router;