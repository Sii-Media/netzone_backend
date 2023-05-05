import express from 'express';
import { getWatcheById, getWatcheItems, getWatchesCategories } from '../controllers/watchesCtrl.js';
import auth from '../middlewares/auth.js';


const router = express.Router();


router.get('/', auth, getWatchesCategories);
router.get('/get-items', auth, getWatcheItems);
router.get('/:id', auth, getWatcheById);

export default router;