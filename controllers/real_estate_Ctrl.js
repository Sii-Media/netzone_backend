

import { RealEstate } from "../models/real_estate/real_estate_model.js";
import userModel from "../models/userModel.js";

export const getAllRealEstate = async (req, res) => {
    try {
        const realEstates = await RealEstate.find().populate('createdBy', 'username');
        res.json(realEstates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const addRealEstate = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            area,
            location,
            bedrooms,
            bathrooms,
            amenities,
            createdBy
        } = req.body;


        const image = req.files['image'][0];
        if (!image) {
            return res.status(404).json({ message: 'Attached file is not an image.' });
        }
        const urlImage = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');

        const newRealEstate = new RealEstate({
            title,
            imageUrl: urlImage,
            description,
            price,
            area,
            location,
            bedrooms,
            bathrooms,
            amenities,
            createdBy
        });

        if (req.files['realestateimages']) {
            const realEstateImages = req.files['realestateimages'];
            const imageUrls = [];
            if (!realEstateImages || !Array.isArray(realEstateImages)) {
                return res.status(404).json({ message: 'Attached files are missing or invalid.' });
            }

            for (const image of realEstateImages) {
                if (!image) {
                    return res.status(404).json({ message: 'Attached file is not an image.' });
                }

                const imageUrl = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');
                imageUrls.push(imageUrl);
                newRealEstate.images = imageUrls;
            }
        }

        const savedRealEstate = await newRealEstate.save();

        res.status(201).json(savedRealEstate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const editRealEstate = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            area,
            location,
            bedrooms,
            bathrooms,
            amenities
        } = req.body;
        const { id } = req.params;

        const updatedData = {
            title,
            description,
            price,
            area,
            location,
            bedrooms,
            bathrooms,
            amenities
        };

        if (req.files['image']) {
            const image = req.files['image'][0];
            if (!image) {
                return res.status(404).json({ message: 'Attached file is not an image.' });
            }
            const urlImage = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');
            updatedData.imageUrl = urlImage;
        }

        if (req.files['realestateimages']) {
            const realEstateImages = req.files['realestateimages'];
            const imageUrls = [];

            if (!realEstateImages || !Array.isArray(realEstateImages)) {
                return res.status(404).json({ message: 'Attached files are missing or invalid.' });
            }

            for (const image of realEstateImages) {
                if (!image) {
                    return res.status(404).json({ message: 'Attached file is not an image.' });
                }

                const imageUrl = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');
                imageUrls.push(imageUrl);
            }
            updatedData.images = imageUrls;
        }

        const updatedRealEstate = await RealEstate.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if (!updatedRealEstate) {
            return res.status(404).json({ message: "Real estate listing not found" });
        }

        res.json(updatedRealEstate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteRealEstate = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRealEstate = await RealEstate.findByIdAndRemove(id);

        if (!deletedRealEstate) {
            return res.status(404).json({ message: "Real estate listing not found" });
        }

        res.json("Real estate listing deleted successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getRealEstateCompanies = async (req, res) => {
    try {

        const realEstateCompanies = await userModel.find({ userType: 'real_estate' });

        res.status(200).json(realEstateCompanies);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCompaniesRealEstates = async (req, res) => {
    try {
        const { id } = req.params;
        const companies = await RealEstate.find({ createdBy: id }).populate('createdBy', 'username');
        res.status(200).json(companies);

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};