import express from 'express';
import { addProduct, getAllProducts, getCategoriesByDepartment, getProductsByCategory } from '../controllers/departmenst/departmentsCtrl.js';

const router = express.Router();


router.get('/categories', getCategoriesByDepartment);
router.get('/products', getProductsByCategory);
router.post('/addProduct', addProduct);
router.get('/allProducts', getAllProducts);



export default router;