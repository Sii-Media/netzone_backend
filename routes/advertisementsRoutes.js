import express from 'express';
import { createAds, getAdvertisementById, getAdvertisements } from '../controllers/advertisementsCtrl.js';
import auth from '../middlewares/auth.js';
const router = express.Router();


router.get('/', getAdvertisements);
router.get('/:id', getAdvertisementById);
router.post('/createAds', createAds);
// router.get('/test',createtest);


export default router;