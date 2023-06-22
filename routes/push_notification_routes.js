import { getAllNotifications, sendPushNotification } from '../controllers/push_notification_Ctrl.js';
import express from 'express';



const router = express.Router();

router.post('/send-notification', sendPushNotification);
router.get('/get-notification', getAllNotifications);



export default router;
