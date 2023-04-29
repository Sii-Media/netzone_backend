import express from 'express';
import { getWatcheById, getWatcheItems, getWatchesCategories } from '../controllers/watchesCtrl.js';


const router = express.Router();


router.get('/', getWatchesCategories);
router.get('/get-items', getWatcheItems);
router.get('/:id', getWatcheById);

export default router;