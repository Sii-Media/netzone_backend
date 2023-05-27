import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import otpGenerator from 'otp-generator'
import crypto from 'crypto';
import Nexmo from 'nexmo';

const nexmo = new Nexmo({
    apiKey: '7e88bc5b',
    apiSecret: '6W60UQDnogslVCuP'
});


const key = 'otp-secret-key';


export const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    }
    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) return res.status(401).json({ message: "User doesn't exist." });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid credentials" });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.status(200).json({ result: existingUser, message: 'LogIn Successfuled', token: token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}




// Handle user registration
export const signUp = async (req, res) => {
    const { username, email, password, userType, firstMobile, secondMobile, thirdMobile, isFreeZoon, subcategory, address, businessLicense, companyProductsNumber, sellType, toCountry } = req.body;
    const profilePhoto = req.files['profilePhoto'][0];
    const bannerPhoto = req.files['bannerPhoto'] ? req.files['bannerPhoto'][0] : null;
    const coverPhoto = req.files['coverPhoto'][0];


    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.json(error);
        }
        const profileUrlImage = 'https://net-zoon.onrender.com/' + profilePhoto.path.replace(/\\/g, '/');
        const coverUrlImage = 'https://net-zoon.onrender.com/' + coverPhoto.path.replace(/\\/g, '/');
        const banerUrlImage = bannerPhoto ? 'https://net-zoon.onrender.com/' + bannerPhoto.path.replace(/\\/g, '/') : null;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ message: "User already exists, please login!" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Upload the profile photo and banner photo using multer

        // Get the uploaded banner photo filename

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            userType,
            firstMobile,
            secondMobile,
            thirdMobile,
            isFreeZoon: isFreeZoon,
            subcategory,
            address,
            businessLicense,
            companyProductsNumber,
            sellType,
            toCountry,
            profilePhoto: profileUrlImage,
            coverPhoto: coverUrlImage,
            banerPhoto: banerUrlImage,
        });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.status(201).json({
            result: newUser,
            message: "User created",
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in registration" });
    }
};


export const createOtp = async (params, callback) => {
    const otp = otpGenerator.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });

    const ttl = 5 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${params.phone}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
    const fullHash = `${hash}.${expires}`;

    console.log(`Your Otp is ${otp}`);

    //Send SMS
    const from = '+971542451874';
    const to = '+971508426896';
    const text = 'Hello, this is a test SMS message!';
    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log('Error:', err);
        } else {
            console.log('Message sent successfully:', responseData);
        }
    });

    return callback(null, fullHash);
};


export const verifyOTP = async (params, callback) => {
    let [hashValue, expires] = params.hash.split('.');

    let now = Date.now();
    if (now > parseInt(expires)) return callback('OTP expired');

    let data = `${params.phone}.${params.otp}.${expires}`;
    let newCalculateHash = crypto.createHmac('sha256', key).update(data).digest('hex');

    if (newCalculateHash === hashValue) {
        return callback(null, "Success");
    } else {
        return callback("Invalid OTP");
    }
};

export const otpLogin = async (req, res) => {

    createOtp(req.body, (error, results) => {
        if (error) {
            res.status(500).json({ message: "Error in registration" });
        }
        return res.status(200).json({
            message: "Success",
            data: results,
        });
    });


};

export const verifyOTPLogin = async (req, res) => {
    verifyOTP(req.body, (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Invalid OTP" }); // Return the response and exit the function
        }
        return res.status(200).json({
            message: "Success",
            data: results,
        });
    });
};