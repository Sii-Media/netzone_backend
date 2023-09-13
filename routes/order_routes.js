import express from 'express';
import { createTheOrder, findAll, getUserOrders, saveOrder, updateTheOrder } from '../controllers/orderCtrl.js'



const router = express.Router();





router.get('/order/:userId', findAll);
router.get('/get/:userId',getUserOrders);
router.post('/order/:userId', createTheOrder);
router.put('/order/:userId', updateTheOrder);
router.post('/save/:userId',saveOrder);




export default router;