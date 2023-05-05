import express from 'express';
import { createAds, getAdvertisementById, getAdvertisements } from '../controllers/advertisementsCtrl.js';
import auth from '../middlewares/auth.js';
const router = express.Router();


router.get('/', auth, getAdvertisements);
router.get('/:id', auth, getAdvertisementById);
router.post('/createAds', auth, createAds);
// router.get('/test',createtest);


export default router;