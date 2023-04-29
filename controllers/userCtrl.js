import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return   res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    }
    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.status(200).json({ result: existingUser, token: token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signUp = async (req, res) => {
    const { username, email, password, userType, firstMobile, secondeMobile, thirdMobile, subcategory, address, isFreeZoon, businessLicense, companyProductsNumber, sellType, toCountry, profilePhoto, banerPhoto } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exist, Please Login!" });
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await userModel.create({ username, email, password: hashedPassword, userType, firstMobile, secondeMobile, thirdMobile, subcategory, address, isFreeZoon, businessLicense, companyProductsNumber, sellType, toCountry, profilePhoto, banerPhoto, });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.status(200).json({
            result: newUser,
            msg: "successfully created",
            token: token,
        })
    } catch (error) {
        res.status(500).json({ message: "error in registeraition" });
    }

}


