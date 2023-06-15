import { DealsCategories } from "../models/deals/dealsCategoriesModel.js";
import { DealsItems } from "../models/deals/dealsItemsModel.js";


export const getAllDealsCategories = async (req, res) => {
    try {

        const dealsCat = await DealsCategories.find({});
        if (!dealsCat) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            message: "success",
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
            message: "success",
            results: dealsItems,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllDealsByCat = async (req, res) => {
    try {
        const { category } = req.body;
        const dealsItems = await DealsItems.find({ category: category });
        if (!dealsItems) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            message: "success",
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

export const AddDeal = async (req, res) => {

    const { name, companyName, prevPrice, currentPrice, startDate, endDate, location, category } = req.body;
    try {
        const image = req.files['dealImage'][0];

        if (!image) {
            return res.status(404).json({ message: 'Attached file is not an image.' });
        }

        const imgUrl = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');
        const foundCategory = await DealsCategories.findOne({ name: category });

        console.log(foundCategory);

        if (!foundCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Create a new deal item using the deal data
        const dealData = {
            name,
            imgUrl,
            companyName,
            prevPrice,
            currentPrice,
            startDate,
            endDate,
            location,
            category,
        }

        const deal = new DealsItems(dealData);

        // Save the new deal item
        await deal.save();

        // Add the new deal item to the category's dealsItems array
        foundCategory.dealsItems.push(deal._id);

        // Save the updated category
        await foundCategory.save();

        return res.json('Success');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


};
