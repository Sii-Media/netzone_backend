import { Category } from "../models/categories/categoryModel.js";
import { Customs } from "../models/categories/customs/customs.js";
import { CompanyCategory } from "../models/categories/freezoon/company_category.js";
import { Freezoon } from "../models/categories/freezoon/freezoon.js";
import { GovernmentalCompany } from "../models/categories/governmental/governmental_company.js";
import { LocalCompany } from "../models/categories/local_company/local_company.js";
import { FactoryCategories } from '../models/categories/factory/factories_categories.js';
import { Factory } from "../models/categories/factory/factory.js";

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

export const getLocalCompany = async (req, res) => {

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


export const getAllFactories = async (req, res) => {
    try {
        await Factory.find({});
        const data = await FactoryCategories.find({}).populate('factory');
        res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}