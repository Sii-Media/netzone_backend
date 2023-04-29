import { MenFashion } from "../models/men_fashion/men_fashionModel.js";
import { MenFashionCategories } from "../models/men_fashion/men_fashion_categoriesModel.js";



export const getMenFashionCategories = async (req, res) => {
    try {
        await MenFashion.find();
        const data = await MenFashionCategories.find({}).populate('items');
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
}

export const getMenFashionItems = async (req, res) => {
    try {
        const data = await MenFashion.find({});
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


export const getMenFashionItemById = async (req, res) => { 
    const { id } = req.params;
    try {

        const data = await MenFashion.findById(id);
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