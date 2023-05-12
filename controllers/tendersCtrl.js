import { TendersCategories } from "../models/tenders/tendersCategoriesModel.js";
import { TendersItems } from "../models/tenders/tendersItemsModel.js";


export const getAllTendersCategories = async (req, res) => {

    try {

        const tendersCat = await TendersCategories.find({});
        if (!tendersCat) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            message: "success",
            results: tendersCat,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const getAllTenders = async (req, res) => {
    try {


        const tendersItems = await TendersItems.find();
        if (!tendersItems) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            message: "success",
            results: tendersItems,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTenderById = async (req, res) => {

    const { id } = req.params;
    try {

        const tender = await TendersItems.findById(id);
        if (!tender) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            message: "success",
            results: tender,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getTendersItemsbyMinPrice = async (req, res) => {

    try {
        const { category } = req.body;
        const tendersItems = await TendersItems.find({ category: category }).sort({ price: 1 });
        return res.json({
            message: "success",
            results: tendersItems,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getTendersItemsbyMaxPrice = async (req, res) => {
    try {
        const { category } = req.body;
        const tendersItems = await TendersItems.find({ category: category }).sort({ price: -1 });
        return res.json({
            message: "success",
            results: tendersItems,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

