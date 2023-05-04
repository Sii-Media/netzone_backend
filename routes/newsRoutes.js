import express from 'express';
import { createNews, getAllNews, getNewsById } from '../controllers/newsCtrl.js';
const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/createNews', createNews)


export default router;