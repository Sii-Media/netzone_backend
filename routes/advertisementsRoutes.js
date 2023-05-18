import express from 'express';
import { createAds, getAdvertisementById, getAdvertisementByType, getAdvertisements } from '../controllers/advertisementsCtrl.js';
import auth from '../middlewares/auth.js';
const router = express.Router();


router.get('/', getAdvertisements);
router.post('/createAds', createAds);
router.get('/getbytype/:userAdvertisingType', getAdvertisementByType);
router.get('/:id', getAdvertisementById);

// router.get('/test',createtest);


export default router;