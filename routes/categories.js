import express from 'express';
import { createCategory, createfreezoon, getAllCategories, getAllFactories, getAllFactoriesCategories, getCustomsCategory, getFreezoon, getGovernmentalCompany, getAllLocalCompanies, getLocalCompanyProducts, getLocalCompanyById, getAllCars, getAllPlans, createVehicle, getVehicleById, } from '../controllers/categories.js';


const router = express.Router();

router.get('/get-categories', getAllCategories);
router.post('/create-category', createCategory);
//Free Zone routes
router.get('/freezoon', getFreezoon);
router.post('/create-freezoon', createfreezoon);


//Factories routes
router.get('/factories', getAllFactoriesCategories);
router.get('/get-all-factories', getAllFactories);


//Custom routes
router.get('/get-customs', getCustomsCategory);


//local company routes
router.get('/local-company', getAllLocalCompanies);
router.get('/local-company/:id', getLocalCompanyById);
router.get('/local-company/get-products/:id', getLocalCompanyProducts);


//govermental routes
router.get('/governmental-company', getGovernmentalCompany);

//Cars routes
router.get('/cars', getAllCars);


//Plans routes
router.get('/planes', getAllPlans);


router.post('/vehicle/create-vehicle', createVehicle);
router.get('/vehicle/:id', getVehicleById);


export default router;