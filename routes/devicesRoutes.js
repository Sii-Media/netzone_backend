import express from 'express';
import { getDeviceItems, getDevicesCategories, getItemById } from '../controllers/devicesCtrl.js';

const router = express.Router();

router.get('/', getDevicesCategories);
router.get('/get-items', getDeviceItems);
router.get('/:id', getItemById);

export default router;