import express from 'express';
import { getVacancies } from '../controllers/vacanciesCtrl.js';

const router = express.Router();

router.get('/',getVacancies);

export default router;