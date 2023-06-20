import { Departments } from "../../models/product/departmenst/departmenst_model.js";
import { DepartmentsCategory } from "../../models/product/departmenst/categories/departments_categories_model.js";
import { Product } from "../../models/product/product.js";
// import upload from "../../middlewares/upload.js";
// import multer from "multer";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name');
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCategoriesByDepartment = async (req, res) => {
    try {

        const { department } = req.body;
        const departmentres = await Departments.findOne({
            name: department
        }).populate('departmentsCategory');
        if (!departmentres) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        const categories = await departmentres.departmentsCategory;
        if (categories) {
            return res.json({
                message: "success",
                results: categories,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

export const getProductsByCategory = async (req, res) => {
    try {

        const { department, category } = req.body;

        await Product.find();

        const departments = await Departments.findOne({ name: department });
        if (!departments) {
            return res.status(404).json({ message: `Department ${department} not found` });
        }
        console.log(departments._id);
        const categories = await DepartmentsCategory.findOne({ name: category, department: departments._id }).populate('products');
        console.log(categories);
        if (!categories) {
            return res.status(404).json({ message: `Category ${category} not found in department ${department}` });
        }
        categories.products.category = category;
        const products = await categories.products;

        if (products) {
            return res.json({
                message: "success",
                department,
                category,
                results: products,
            });
        } else {
            res.status(404).send(`Category ${category} not found in department ${department}`);

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
};

export const addProduct = async (req, res) => {
    try {
        const { departmentName, categoryName } = req.body;
        const { owner, name, description, price, images, guarantee, address, madeIn, year } = req.body;
        const image = req.files['image'][0];

        if (!image) {
            return res.status(404).json({ message: 'Attached file is not an image.' });
        }

        const urlImage = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');

        // Find department by name
        const department = await Departments.findOne({ name: departmentName });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        // Find category by name and department
        const category = await DepartmentsCategory.findOne({ name: categoryName, department: department._id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const productData = {
            owner: owner, // assuming user is authenticated and req.user contains user information
            name,
            imageUrl: urlImage,
            category: category._id,
            description,
            price,
            images,
            guarantee,
            address,
            madeIn,
            year,

        };

        // Add optional fields if they exist
        if (req.files['video']) {
            const video = req.files['video'][0];
            const urlVideo = 'https://net-zoon.onrender.com/' + video.path.replace(/\\/g, '/');
            productData.vedioUrl = urlVideo;
        }

        if (req.files['gif']) {
            const gif = req.files['gif'][0];
            const gifUrl = 'https://net-zoon.onrender.com/' + gif.path.replace(/\\/g, '/');
            productData.gifUrl = gifUrl;
        }

        const product = new Product(productData);
        const savedProduct = await product.save();

        category.products.push(savedProduct._id);
        await category.save();

        return res.status(201).json('success');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
};

export const editProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        // const { departmentName, categoryName } = req.body;
        const { name, description, price, images, guarantee, address, madeIn, year } = req.body;
        const image = req.files['image'][0];

        if (!image) {
            return res.status(404).json({ message: 'Attached file is not an image.' });
        }

        const urlImage = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');

        // Find department by name
        // const department = await Departments.findOne({ name: departmentName });
        // if (!department) {
        //     return res.status(404).json({ message: 'Department not found' });
        // }

        // // Find category by name and department
        // const category = await DepartmentsCategory.findOne({ name: categoryName, department: department._id });
        // if (!category) {
        //     return res.status(404).json({ message: 'Category not found' });
        // }

        const productData = {
            name,
            imageUrl: urlImage,
            category: category._id,
            description,
            price,
            images,
            guarantee,
            address,
            madeIn,
            year,
        };

        // Add optional fields if they exist
        if (req.files['video']) {
            const video = req.files['video'][0];
            const urlVideo = 'https://net-zoon.onrender.com/' + video.path.replace(/\\/g, '/');
            productData.vedioUrl = urlVideo;
        }

        if (req.files['gif']) {
            const gif = req.files['gif'][0];
            const gifUrl = 'https://net-zoon.onrender.com/' + gif.path.replace(/\\/g, '/');
            productData.gifUrl = gifUrl;
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json('success');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
};



export const getUserProducts = async (req, res) => {
    const { username } = req.body;
    try {
        const products = await Product.find({ owner: username }).populate('category', 'name');
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};



