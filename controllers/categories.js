import { Category } from "../models/categories/categoryModel.js";
import { Customs } from "../models/categories/customs/customs.js";
import { CompanyCategory } from "../models/categories/freezoon/company_category.js";
import { Freezoon } from "../models/categories/freezoon/freezoon.js";
import { GovernmentalCompany } from "../models/categories/governmental/governmental_company.js";
import { LocalCompany } from "../models/categories/local_company/local_company.js";
import { FactoryCategories } from '../models/categories/factory/factories_categories.js';
import { Factory } from "../models/categories/factory/factory.js";
import { Product } from "../models/product/product.js";
import { Vehicle } from "../models/categories/vehicle/vehicleModel.js";


//Categories controllers
export const getAllCategories = async (req, res) => {
    try {
        const data = await Category.find({});
        if (data) {
            return res.status(200).json({
                msg: "success",
                results: data,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });

    }

};


export const createCategory = async (req, res) => {
    try {

        const { url, name } = req.body;

        const exisitingCategory = await Category.findOne({ name });

        if (exisitingCategory) {
            return res.json({
                msg: "Category already exists"
            });
        }


        const newCategory = await Category.create({ url: url, name: name, });
        res.status(200).json({
            success: true,
            msg: "Category created successfully",
            results: newCategory,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

//FreeZoon controllers
export const getFreezoon = async (req, res) => {
    try {

        const data = await Freezoon.find({}).populate('freezoonplaces');
        if (!data) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({
            results: data,
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const createfreezoon = async (req, res) => {
    try {

        const companyCategory = new CompanyCategory({
            categoryName: 'dubai',
            name: 'dubasai',
            city: 'dubasai',
            address: 'dubai',
            email: 'dubai@gmail.com',
            imgurl: 'asd',
            info: 'as',
            companyimages: ['asd'],
            videourl: 'asd',
        });
        const companyCategory2 = new CompanyCategory({
            categoryName: 'dubai2',
            name: 'dubasai',
            city: 'dubasai',
            address: 'dubai',
            email: 'dubai@gmail.com',
            imgurl: 'asd',
            info: 'as',
            companyimages: ['asd'],
            videourl: 'asd',
        });


        await companyCategory.save();
        await companyCategory2.save();

        const freezoon = new Freezoon({
            name: 'freezoon',
            img: 'asdd',
            freezoonplaces: [companyCategory._id, companyCategory2._id],
        });

        await freezoon.save();

        return res.json({
            msg: "success",
        })
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

//Customs controllers
export const getCustomsCategory = async (req, res) => {

    try {

        const data = await Customs.find({});
        res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}

//localcompany controllers
export const getAllLocalCompanies = async (req, res) => {

    try {
        const data = await LocalCompany.find({});
        res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}

export const getLocalCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await LocalCompany.findById(id);
        if (!company) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        res.json({
            msg: "success",
            results: company,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getLocalCompanyProducts = async (req, res) => {

    try {
        const { id } = req.params;
        const company = await LocalCompany.findById(id).populate('products');
        if (!company) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        const products = company.toObject().products;

        res.json({
            msg: "success",
            results: products,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Govermental Company controllers
export const getGovernmentalCompany = async (req, res) => {

    try {

        const data = await GovernmentalCompany.find({});
        res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}

//Factory controllers
export const getAllFactoriesCategories = async (req, res) => {
    try {
        await Factory.find({});
        const data = await FactoryCategories.find({}, { title: 1, _id: 0 });
        res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const getAllFactories = async (req, res) => {
    try {
        // await Factory.find({});
        const data = await FactoryCategories.find({}).populate('factory');
        res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//Cars Controllers
export const getAllCars = async (req, res) => {
    try {
        const cars = await Vehicle.find({ category: "cars" });
        res.json({
            msg: "success",
            results: cars,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


//Plans Controllers
export const getAllPlans = async (req, res) => {
    try {
        const plans = await Vehicle.find({ category: "plans" });
        res.json({
            msg: "success",
            results: plans,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createVehicle = async (req, res) => {
    const { name, imageUrl, description, price, kilometers, year, location, type, category } = req.body;

    try {
        const newVehicle = new Vehicle({
            name,
            imageUrl,
            description,
            price,
            kilometers,
            year,
            location,
            type,
            category
        });

        const savedVehicle = await newVehicle.save();
        res.status(201).json({
            msg: 'success',
            result: savedVehicle
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}