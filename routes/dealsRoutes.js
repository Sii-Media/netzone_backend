import express from 'express';
import { getAllDeals, getAllDealsCategories, getDealById } from '../controllers/dealsCtrl.js';

const router = express.Router();


router.get('/', getAllDealsCategories);
router.get('/alldealsItems', getAllDeals);
router.get('/:id', getDealById);


export default router;