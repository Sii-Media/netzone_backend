import express from 'express';
import { getDeviceItems, getDevicesCategories, getItemById } from '../controllers/devicesCtrl.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, getDevicesCategories);
router.get('/get-items/:id', auth, getDeviceItems);
router.get('/:id', auth, getItemById);

export default router;