import express from 'express';

import { getWomenFashionCategories, getWomenFashionItemById, getWomenFashionItems } from '../controllers/women_fashionCtrl.js';

const router = express.Router();


router.get('/', getWomenFashionCategories);
router.get('/get-womenfashion-item', getWomenFashionItems)
router.get('/:id', getWomenFashionItemById);


export default router;