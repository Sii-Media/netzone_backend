import express from 'express';
import { check } from 'express-validator';
import { createCategory, createfreezoon, getAllCategories, getAllFactories, getAllFactoriesCategories, getCustomsCategory, getFreezoon, getAllLocalCompanies, getLocalCompanyProducts, getLocalCompanyById, getAllCars, getAllPlans, createVehicle, getVehicleById, getCustoms, getCustomsById, getFactoryById, getFreezoonById, getAllUsedPlans, getAllNewPlans, getGovermental, getGovermentalById, getCarsCompanies, getPlanesCompanies, } from '../controllers/categories.js';
import auth from '../middlewares/auth.js';


const router = express.Router();

router.get('/get-categories', getAllCategories);
router.post('/create-category', auth, [
    check('url').not().isEmpty().withMessage('url cannot be empty'),
    check('name').not().isEmpty().withMessage('name cannot be empty')
], createCategory);
//Free Zone routes
router.get('/freezoon', getFreezoon);
router.post('/create-freezoon', createfreezoon);
router.get('/freezoon/:id', getFreezoonById);


//Factories routes
router.get('/factories', getAllFactoriesCategories);
router.get('/get-all-factories/:id', getAllFactories);
router.get('/factory/:id', getFactoryById);


//Custom routes
router.get('/get-customs-categories', getCustomsCategory);
router.get('/get-customs', getCustoms);
router.get('/customs/:id', getCustomsById);


//local company routes
router.get('/local-company', getAllLocalCompanies);
router.get('/local-company/:id', getLocalCompanyById);
router.get('/local-company/get-products/:id', getLocalCompanyProducts);


//govermental routes

router.get('/govermental', getGovermental);
router.get('/govermental/:id', getGovermentalById);

//Cars routes
router.get('/cars', getAllCars);
router.get('/cars-companies', getCarsCompanies);

//Plans routes
router.get('/planes', getAllPlans);
router.get('/planes/getoldplanes', getAllUsedPlans);
router.get('/planes/getnewplanes', getAllNewPlans);
router.get('/planes-companies', getPlanesCompanies),


router.post('/vehicle/create-vehicle', auth, createVehicle);
router.get('/vehicle/:id', auth, getVehicleById);


export default router;