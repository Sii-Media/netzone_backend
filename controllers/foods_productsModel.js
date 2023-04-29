import { Foods } from "../models/food_products/foodsModel.js";
import { FoodsCategories } from "../models/food_products/foods_categoriesModel.js";



export const getFoodsCategories = async (req, res) => {

    try {
        await Foods.find();
        const data = await FoodsCategories.find({}).populate('items');
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

export const getFoodsItems = async (req, res) => {
    try {
        const data = await Foods.find({});
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

export const getFoodById = async (req, res) => {

    const { id } = req.params;
    try {

        const data = await Foods.findById(id);
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