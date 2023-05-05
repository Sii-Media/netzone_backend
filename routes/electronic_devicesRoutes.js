import express from 'express';
import { getElectronicDevicById, getElectronicDevices, getElectronicDevicesItems } from '../controllers/electronic_devicesCtrl.js';
import auth from '../middlewares/auth.js';

const router = express.Router();


router.get('/', auth, getElectronicDevices);
router.get('/items/:id', auth, getElectronicDevicesItems);
router.get('/:id', auth, getElectronicDevicById);

export default router;