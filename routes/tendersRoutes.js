import express from 'express';
import { getAllTenders, getAllTendersCategories, getTenderById, getTendersItemsbyMaxPrice, getTendersItemsbyMinPrice } from '../controllers/tendersCtrl.js';
import auth from '../middlewares/auth.js';
const router = express.Router();


router.get('/', auth, getAllTendersCategories);
router.get('/alltendersItems', auth, getAllTenders);
router.get('/itemsbyminprice', auth, getTendersItemsbyMinPrice);
router.get('/itemsbymaxprice', auth, getTendersItemsbyMaxPrice);


router.get('/:id', getTenderById);



export default router;