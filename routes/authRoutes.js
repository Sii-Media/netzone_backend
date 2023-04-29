import express from 'express';
import { signUp, signin } from '../controllers/userCtrl.js';
const router = express.Router();

router.post('/register', signUp);
router.post('/signin', signin);

export default router;