import admin from 'firebase-admin';
import fcm from 'fcm-node';
import { Notifications } from '../models/notification/notification_model.js';
// import serviceAccount from '../config/serviceAccountKey.json' assert { type: "json" };

const serverKey = 'AAAArbtn5Qk:APA91bGfLGCIdF6NicedfL5W5yRdvEMq6UVnx7TiSsjZOjipiDLS93curDNfjVeM17g8Ep29yps9p_wCCQVaxopitSEY1o0fdjJHgFQM289nKmpvUGK4KWQDpLJOqnjCx7fN2kHHqxiH';


var FCM = new fcm(serverKey);

// admin.initializeApp({
//     credential: admin.credential.cert(serverKey)
// });
// const certPath = admin.credential.cert(serverKey);

export const sendPushNotification = async (req, res, next) => {
    const { username, imageUrl, text } = req.body;
    try {
        const notification = new Notifications({
            username: username,
            userProfileImage: imageUrl,
            text: text
        });
        await notification.save();
        let message = {
            to: req.body.fcm_token,
            notification: {
                title: 'Netzoon',
                body: `${username} Add Something`,
            },
            data: {
                username: username,
                imageUrl: imageUrl,
                text: text,
            }
        };
        FCM.send(message, function (err, resp) {
            if (err) {
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    message: message.data
                });
            }
        });
    } catch (error) {
        throw error;
    }
};


export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notifications.find();

        if (!notifications) {
            return res.status(404).json({ message: 'No data found' });
        }


        return res.json(notifications);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
