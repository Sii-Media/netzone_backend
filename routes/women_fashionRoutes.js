import express from 'express';

import { getWomenFashionCategories, getWomenFashionItemById, getWomenFashionItems } from '../controllers/women_fashionCtrl.js';
import auth from '../middlewares/auth.js';

const router = express.Router();


router.get('/', auth, getWomenFashionCategories);
router.get('/get-womenfashion-item', auth, getWomenFashionItems)
router.get('/:id', auth, getWomenFashionItemById);


export default router;