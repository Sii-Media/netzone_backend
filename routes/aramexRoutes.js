import express from 'express';
import { calculateRateController, createPickUpController, createShipmentController } from '../controllers/aramex.js';

const router = express.Router();


router.post('/calculateRate', calculateRateController);
router.post('/createPickUp', createPickUpController);
router.post('/createShipment', createShipmentController);

export default router;