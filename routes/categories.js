import express from 'express';
import { createCategory, createfreezoon, getAllCategories, getCustomsCategory, getFreezoon, getGovernmentalCompany, getLocalCompany } from '../controllers/categories.js';


const router = express.Router();

router.get('/get-categories', getAllCategories);
router.post('/create-category', createCategory);

router.get('/freezoon', getFreezoon);
router.post('/create-freezoon', createfreezoon);

router.get('/get-customs', getCustomsCategory);

router.get('/local-company', getLocalCompany);

router.get('/governmental-company', getGovernmentalCompany);


export default router;