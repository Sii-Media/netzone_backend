import express from 'express';
import { check } from 'express-validator';
import { otpLogin, signUp, signin, verifyOTPLogin } from '../controllers/userCtrl.js';

const router = express.Router();

const userType = ['local_company', 'user', 'car', 'ship'];

router.post('/register', [
    check('email').isEmail()
        .withMessage('Please enter a valid email address'),
    check('password').trim().isLength({ min: 8 })
        .not()
        .isEmpty()
        .withMessage('Please enter a valid email address'),
    check('username').trim().not().isEmpty(),
    check('userType')
        .isIn(userType)
        .withMessage('userType value must be one of: ' + userType.join(', ')),
    check('isFreeZoon').isBoolean().withMessage('isFreeZoon must be a boolean value'),
], signUp);
router.post('/signin',
    [
        check('email').isEmail()
            .withMessage('Please enter a valid email address'),
        check('password').trim().isLength({ min: 8 })
            .not()
            .isEmpty()
            .withMessage('Please enter a valid email address'),
    ], signin);

router.post('/otpLogin',otpLogin);
router.post('/verifyOtpLogin',verifyOTPLogin);


export default router;