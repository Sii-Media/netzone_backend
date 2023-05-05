import express from 'express';
import { createNews, getAllNews, getNewsById } from '../controllers/newsCtrl.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.get('/', auth, getAllNews);
router.get('/:id', auth, getNewsById);
router.post('/createNews', auth, createNews)


export default router;