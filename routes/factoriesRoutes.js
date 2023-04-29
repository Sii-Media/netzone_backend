import express from 'express';
import { getAllFactories } from '../controllers/categories.js';

const router = express.Router();

router.get('/', getAllFactories);

export default router;