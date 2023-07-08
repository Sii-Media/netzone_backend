import express from 'express';
import { addRealEstate, deleteRealEstate, editRealEstate, getAllRealEstate } from '../controllers/real_estate_Ctrl.js';
const router = express.Router();

router.get('/', getAllRealEstate);
router.post('/add-real-estate', addRealEstate);
router.put('/edit-real-estate/:id', editRealEstate);
router.delete('/delete-real-estate/:id', deleteRealEstate);




export default router;