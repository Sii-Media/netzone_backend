import express from 'express';
import { getPerfumeById, getPerfumeItems, getPerfumesCategories } from '../controllers/perfumesCtrl.js';

const router = express.Router();


router.get('/', getPerfumesCategories);
router.get('/get-items', getPerfumeItems);
router.get('/:id', getPerfumeById);

export default router;