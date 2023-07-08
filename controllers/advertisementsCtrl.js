import mongoose from "mongoose";
import { Advertisement } from "../models/advertisements/advertisementsModel.js";


export const getAdvertisements = async (req, res) => {

    try {

        const data = await Advertisement.find({}).populate('owner', 'username userType');
        return res.json({
            message: "success",
            results: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }

};

export const getUserAds = async (req, res) => {
    try {
        const { userId } = req.params;
        const data = await Advertisement.find({ owner: userId }).populate('owner', 'username userType');
        return res.json({
            message: "success",
            results: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getAdvertisementById = async (req, res) => {
    const { id } = req.params;
    try {

        const data = await Advertisement.findById(id).populate('owner', 'username userType');
        if (!data) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAdvertisementByType = async (req, res) => {
    const userAdvertisingType = req.params.userAdvertisingType; // Retrieve the userAdvertisingType from req.params

    try {

        const data = await Advertisement.find({ advertisingType: userAdvertisingType }).populate('owner', 'username userType');
        if (!data) {
            return res.status(404).json({ message: 'no Data Found' });
        }

        return res.json({
            message: "success",
            results: data,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const createAds = async (req, res) => {
    const { owner, advertisingTitle, advertisingStartDate, advertisingEndDate, advertisingDescription, advertisingCountryAlphaCode, advertisingBrand, advertisingViews, advertisingYear, advertisingLocation, advertisingPrice, advertisingType, purchasable } = req.body;

    const image = req.files['image'][0]
    if (!image) { return res.status(404).json({ message: 'Attached file is not an image.' }); }
    const urlImage = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');

    const ownerId = new mongoose.Types.ObjectId(owner);

    try {
        const newAds = new Advertisement({
            owner: ownerId,
            advertisingTitle,
            advertisingStartDate,
            advertisingEndDate,
            advertisingDescription,
            advertisingImage: urlImage,
            advertisingCountryAlphaCode,
            advertisingBrand,
            advertisingViews,
            advertisingYear,
            advertisingLocation,
            advertisingPrice,
            advertisingType,
            purchasable: purchasable
        });
        if (req.files['advertisingImageList']) {
            const adsImages = req.files['advertisingImageList'];
            const imageUrls = [];
            if (!adsImages || !Array.isArray(adsImages)) {
                return res.status(404).json({ message: 'Attached files are missing or invalid.' });
            }

            for (const image of adsImages) {
                if (!image) {
                    return res.status(404).json({ message: 'Attached file is not an image.' });
                }

                const imageUrl = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');
                imageUrls.push(imageUrl);
                newAds.advertisingImageList = imageUrls;
            }
        }
        if (req.files['video']) {
            const video = req.files['video'][0];
            const urlVideo = 'https://net-zoon.onrender.com/' + video.path.replace(/\\/g, '/');
            newAds.advertisingVedio = urlVideo;
        }

        const savedAds = await newAds.save();
        res.status(201).json(savedAds._id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// export const createtest = async(req, res) => {

//     if (!req.file) {
//         res.status(422).json({ message: error.message });
//     }
//     const adsImageUrl = await req.file.path;
//     res.send(adsImageUrl);
// }