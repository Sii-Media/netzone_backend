import { DealsCategories } from "../models/deals/dealsCategoriesModel.js";
import { DealsItems } from "../models/deals/dealsItemsModel.js";


export const getAllDealsCategories = async (req, res) => {
    try {

        const dealsCat = await DealsCategories.find({});
        if (!dealsCat) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            msg: "success",
            results: dealsCat,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllDeals = async (req, res) => {
    try {

        const dealsItems = await DealsItems.find({});
        if (!dealsItems) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            msg: "success",
            results: dealsItems,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getDealById = async (req, res) => {
    const { id } = req.params;
    try {

        const deal = await DealsItems.findById(id);
        if (!deal) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            msg: "success",
            results: deal,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};