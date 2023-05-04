import express from 'express';
import { getElectronicDevicById, getElectronicDevices, getElectronicDevicesItems } from '../controllers/electronic_devicesCtrl.js';

const router = express.Router();


router.get('/', getElectronicDevices);
router.get('/items/:id', getElectronicDevicesItems);
router.get('/:id', getElectronicDevicById);

export default router;