import express from 'express';
import { getLegalAdvices } from '../controllers/legalAdviceCtrl.js';

const router = express.Router();


router.get('/',getLegalAdvices);

export default router;