import { WomenFashion } from "../models/women_fashion/women_fashionModel.js";
import { WomenFashionCategories } from "../models/women_fashion/women_fashion_categoriesModel.js";



export const getWomenFashionCategories = async (req, res) => {
    try {
        await WomenFashion.find();
        const data = await WomenFashionCategories.find({}).populate('items');
        if (!data) {
            res.status(404).json({ message: 'no Data Found' });
        }
        res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}


export const getWomenFashionItems = async (req, res) => {
    try {
        const data = await WomenFashion.find({});
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


export const getWomenFashionItemById = async (req, res) => { 
    const { id } = req.params;
    try {

        const data = await WomenFashion.findById(id);
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