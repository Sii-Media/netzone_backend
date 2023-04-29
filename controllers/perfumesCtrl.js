import { PerfumeCategory } from "../models/perfumes/perfumesCategoriesModel.js";
import { PerfumeItems } from "../models/perfumes/perfumesItemsModel.js";



export const getPerfumesCategories = async (req, res) => {
    try {
        const data = await PerfumeCategory.find({});
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


export const getPerfumeItems = async (req, res) => {
    try {
        const data = await PerfumeItems.find({}).populate('type', 'name',);
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


export const getPerfumeById = async (req, res) => {
    const { id } = req.params;
    try {

        const perfume = await PerfumeItems.findById(id);
        if (!perfume) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            msg: "success",
            results: perfume,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};