import express from 'express';
import { check } from 'express-validator';
import { createCategory, createfreezoon, getAllCategories, getAllFactories, getAllFactoriesCategories, getCustomsCategory, getFreezoon, getGovernmentalCompany, getAllLocalCompanies, getLocalCompanyProducts, getLocalCompanyById, getAllCars, getAllPlans, createVehicle, getVehicleById, getCustoms, getCustomsById, getFactoryById, getAllGovermentalCategories, } from '../controllers/categories.js';
import auth from '../middlewares/auth.js';


const router = express.Router();

router.get('/get-categories', auth, getAllCategories);
router.post('/create-category', auth, [
    check('url').not().isEmpty().withMessage('url cannot be empty'),
    check('name').not().isEmpty().withMessage('name cannot be empty')
], createCategory);
//Free Zone routes
router.get('/freezoon', auth, getFreezoon);
router.post('/create-freezoon', auth, createfreezoon);


//Factories routes
router.get('/factories', auth, getAllFactoriesCategories);
router.get('/get-all-factories/:id', auth, getAllFactories);
router.get('/factory/:id', auth, getFactoryById);


//Custom routes
router.get('/get-customs-categories', auth, getCustomsCategory);
router.get('/get-customs', auth, getCustoms);
router.get('/customs/:id', auth, getCustomsById);


//local company routes
router.get('/local-company', auth, getAllLocalCompanies);
router.get('/local-company/:id', auth, getLocalCompanyById);
router.get('/local-company/get-products/:id', auth, getLocalCompanyProducts);


//govermental routes
router.get('/governmental-company', auth, getGovernmentalCompany);
router.get('/governmental-categories', auth, getAllGovermentalCategories);

//Cars routes
router.get('/cars', auth, getAllCars);


//Plans routes
router.get('/planes', auth, getAllPlans);


router.post('/vehicle/create-vehicle', auth, createVehicle);
router.get('/vehicle/:id', auth, getVehicleById);


export default router;