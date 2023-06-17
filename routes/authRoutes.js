import express from 'express';
import { check } from 'express-validator';
import { EditUser, addProductToFavorites, changePassword, clearFav, getAllFavorites, getUserById, otpLogin, removeProductFromFavorites, signUp, signin, verifyOTPLogin } from '../controllers/userCtrl.js';

const router = express.Router();

const userType = ['local_company', 'user', 'car', 'ship', 'news_agency'];

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

router.put('/password/:userId', changePassword);

router.post('/otpLogin', otpLogin);
router.post('/verifyOtpLogin', verifyOTPLogin);

router.put('/editUser/:userId', EditUser);


router.post('/favorites/add', addProductToFavorites);
router.post('/favorites/remove', removeProductFromFavorites);
router.post('/favorites/clear', clearFav);
router.get('/favorites/:userId', getAllFavorites);
router.get('/getUser/:userId', getUserById);
export default router;