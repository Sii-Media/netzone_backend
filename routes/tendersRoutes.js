import express from 'express';
import { getAllTenders, getAllTendersCategories, getTenderById, getTendersItemsbyMaxPrice, getTendersItemsbyMinPrice } from '../controllers/tendersCtrl.js';
const router = express.Router();


router.get('/', getAllTendersCategories);
router.get('/alltendersItems', getAllTenders);
router.get('/itemsbyminprice', getTendersItemsbyMinPrice);
router.get('/itemsbymaxprice', getTendersItemsbyMaxPrice);


router.get('/:id', getTenderById);



export default router;