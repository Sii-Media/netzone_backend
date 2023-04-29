import express from 'express';
import { getAllNews } from '../controllers/newsCtrl.js';
const router = express.Router();

router.get('/', getAllNews);


export default router;