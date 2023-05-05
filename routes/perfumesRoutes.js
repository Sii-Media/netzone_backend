import express from 'express';
import { getPerfumeById, getPerfumeItems, getPerfumesCategories } from '../controllers/perfumesCtrl.js';
import auth from '../middlewares/auth.js';

const router = express.Router();


router.get('/', auth, getPerfumesCategories);
router.get('/get-items', auth, getPerfumeItems);
router.get('/:id', auth, getPerfumeById);

export default router;