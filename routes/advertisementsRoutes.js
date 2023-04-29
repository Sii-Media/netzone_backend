import express from 'express';
import { getAdvertisementById, getAdvertisements } from '../controllers/advertisementsCtrl.js';
const router = express.Router();


router.get('/', getAdvertisements);
router.get('/:id', getAdvertisementById)


export default router;