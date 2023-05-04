import express from 'express';
import { createAds, getAdvertisementById, getAdvertisements } from '../controllers/advertisementsCtrl.js';
const router = express.Router();


router.get('/', getAdvertisements);
router.get('/:id', getAdvertisementById);
router.post('/createAds', createAds);


export default router;