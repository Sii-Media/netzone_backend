import express from 'express';
import { getAllDeals, getAllDealsCategories, getDealById } from '../controllers/dealsCtrl.js';
import auth from '../middlewares/auth.js';

const router = express.Router();


router.get('/', auth, getAllDealsCategories);
router.get('/alldealsItems', auth, getAllDeals);
router.get('/:id', auth, getDealById);


export default router;