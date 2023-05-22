import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

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

// export const signUp = async (req, res) => {
//     const { username, email, password, userType, firstMobile, secondeMobile, thirdMobile, subcategory, address, isFreeZoon, businessLicense, companyProductsNumber, sellType, toCountry, profilePhoto, banerPhoto } = req.body;
//     try {
//         const error = validationResult(req);
//         if (!error.isEmpty()) {
//             return res.json(error);
//         }
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) return res.status(422).json({ message: "User already exist, Please Login!", });
//         const hashedPassword = await bcrypt.hash(password, 12);

//         const newUser = await userModel.create({ username, email, password: hashedPassword, userType, firstMobile, secondeMobile, thirdMobile, subcategory, address, isFreeZoon, businessLicense, companyProductsNumber, sellType, toCountry, profilePhoto, banerPhoto, });
//         const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

//         res.status(201).json({
//             result: newUser,
//             message: "user created",
//             token: token,
//         })
//     } catch (error) {
//         res.status(500).json({ message: "error in registeraition" });
//     }

// }


// Handle user registration
export const signUp = async (req, res) => {
    const { username, email, password, userType, firstMobile, secondMobile, thirdMobile, isFreeZoon, subcategory, address, businessLicense, companyProductsNumber, sellType, toCountry } = req.body;
    const profilePhoto = req.files['profilePhoto'][0];
    const bannerPhoto = req.files['bannerPhoto'] ? req.files['bannerPhoto'][0] : null;


    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.json(error);
        }
        const profileUrlImage = 'https://net-zoon.onrender.com/' + profilePhoto.path.replace(/\\/g, '/');
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
