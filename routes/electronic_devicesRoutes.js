import express from 'express';
import { getElectronicDevicById, getElectronicDevices } from '../controllers/electronic_devicesCtrl.js';

const router = express.Router();


router.get('/', getElectronicDevices);
router.get('/:id', getElectronicDevicById);

export default router;