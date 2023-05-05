import express from 'express';
import { getVacancies } from '../controllers/vacanciesCtrl.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, getVacancies);

export default router;