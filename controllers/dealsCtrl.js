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
        const { country } = req.query;

        let dealsItems;
        if (country) {
            dealsItems = await DealsItems.find({ country: country });
        } else {
            dealsItems = await DealsItems.find();
        }

        // const dealsItems = await DealsItems.find({ country: country });
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
        const { country } = req.query;
        const { category } = req.query;
        const dealsItems = await DealsItems.find({ category: category, country: country });
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
        return res.json(deal);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const AddDeal = async (req, res) => {

    const { name, companyName, prevPrice, currentPrice, startDate, endDate, location, category, country } = req.body;
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
            country
        }

        const deal = new DealsItems(dealData);

        // Save the new deal item
        await deal.save();

        // Add the new deal item to the category's dealsItems array
        foundCategory.dealsItems.push(deal._id);

        // Save the updated category
        await foundCategory.save();

        return res.json(deal._id);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


};

export const editDeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, companyName, prevPrice, currentPrice, startDate, endDate, location, category, country } = req.body;


        // Check if deals item with the given ID exists
        const existingDeal = await DealsItems.findById(id);
        if (!existingDeal) {
            return res.status(404).json({ message: 'Deals item not found' });
        }


        existingDeal.name = name;
        existingDeal.companyName = companyName;
        existingDeal.prevPrice = prevPrice;
        existingDeal.currentPrice = currentPrice;
        existingDeal.startDate = startDate;
        existingDeal.endDate = endDate;
        existingDeal.location = location;
        existingDeal.category = category;
        existingDeal.country = country;

        if (req.files['dealImage']) {
            const image = req.files['dealImage'][0];
            const imgUrl = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');
            existingDeal.imgUrl = imgUrl;
        }

        const updatedDeal = await existingDeal.save();
        res.json('Deals item updated successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDeal = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if deals item with the given ID exists
        const existingDeal = await DealsItems.findById(id);
        if (!existingDeal) {
            return res.status(404).json('Deals item not found');
        }

        // Delete the deals item
        await DealsItems.findByIdAndRemove(id);

        res.json('Deals item deleted successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
