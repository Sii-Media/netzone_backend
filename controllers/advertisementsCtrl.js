import { Advertisement } from "../models/advertisements/advertisementsModel.js";


export const getAdvertisements = async (req, res) => {

    try {

        const data = await Advertisement.find({});
        return res.json({
            message: "success",
            results: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data,
        });

    }

};

export const getAdvertisementById = async (req, res) => {
    const { id } = req.params;
    try {

        const data = await Advertisement.findById(id);
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

export const getAdvertisementByType = async (req, res) => {
    const userAdvertisingType = req.params.userAdvertisingType; // Retrieve the userAdvertisingType from req.params

    try {

        const data = await Advertisement.find({ advertisingType: userAdvertisingType });
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
    const { advertisingTitle, advertisingStartDate, advertisingEndDate, advertisingDescription, advertisingCountryAlphaCode, advertisingBrand, advertisingViews, advertisingYear, advertisingLocation, advertisingPrice, advertisingImageList, advertisingVedio, advertisingType } = req.body;

    const image = req.file;
    if (!image) { return res.status(404).json({ message: 'Attached file is not an image.' }); }
    const urlImage = 'http://10.0.2.2:5000/' + image.path.replace(/\\/g, '/');


    try {
        const newAds = new Advertisement({
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
            advertisingImageList,
            advertisingVedio,
            advertisingType
        });

        const savedAds = await newAds.save();
        res.status(201).json('success');
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