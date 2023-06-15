import express from 'express';
import { AddDeal, getAllDeals, getAllDealsByCat, getAllDealsCategories, getDealById } from '../controllers/dealsCtrl.js';
import auth from '../middlewares/auth.js';

const router = express.Router();


router.get('/', getAllDealsCategories);
router.get('/alldealsItems', getAllDeals);
router.get('/dealsByCat', getAllDealsByCat);
router.get('/:id', getDealById);
router.post('/addDeal', AddDeal);


export default router;