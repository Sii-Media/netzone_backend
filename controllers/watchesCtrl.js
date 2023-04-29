import { WatchesCategory } from "../models/watches/watchesCategoriesModel.js";
import { WatchesItems } from "../models/watches/watchesItemsModel.js";



export const getWatchesCategories = async (req, res) => {
    try {
        const data = await WatchesCategory.find({});
        if (!data) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


};

export const getWatcheItems = async (req, res) => {

    try {
        const data = await WatchesItems.find({}).populate('type', 'name',);
        if (!data) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getWatcheById = async (req, res) => {
    const { id } = req.params;
    try {

        const data = await WatchesItems.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            msg: "success",
            results: data,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};