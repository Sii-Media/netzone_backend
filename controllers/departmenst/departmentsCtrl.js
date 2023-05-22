import { Departments } from "../../models/product/departmenst/departmenst_model.js";
import { DepartmentsCategory } from "../../models/product/departmenst/categories/departments_categories_model.js";
import { Product } from "../../models/product/product.js";
// import upload from "../../middlewares/upload.js";
// import multer from "multer";


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
        const products = await categories.products;
        if (products) {
            return res.json({
                message: "success",
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
        const { name, description, price, images, videoUrl, guarantee, property, madeIn, year } = req.body;
        const image = req.files['image'][0];
        console.log(image);
        if (!image) { return res.status(404).json({ message: 'Attached file is not an image.' }); }

        const urlImage = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');
        // find department by name
        const department = await Departments.findOne({ name: departmentName });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        // find category by name and department
        const category = await DepartmentsCategory.findOne({ name: categoryName, department: department._id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }


        const product = new Product({
            owner: 'owner', // assuming user is authenticated and req.user contains user information
            name,
            imageUrl: urlImage,
            category: category._id,
            description,
            price,
            images,
            // images: req.files.map((file) => file.path),
            videoUrl,
            guarantee,
            property,
            madeIn,
            year,
        });
        const savedProduct = await product.save();
        category.products.push(savedProduct._id);
        await category.save();
        return res.status(201).json('success');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
};


// export const addProduct = async (req, res) => {
//     try {
//         const { departmentName, categoryName } = req.params;
//         const { name, imageUrl, description, price, images, videoUrl, guarantee, property, madeIn, year } = req.body;

//         // find department by name
//         const department = await Departments.findOne({ name: departmentName });
//         if (!department) {
//             return res.status(404).json({ message: "Department not found" });
//         }

//         // find category by name and department
//         const category = await DepartmentsCategory.findOne({ name: categoryName, department: department._id });
//         if (!category) {
//             return res.status(404).json({ message: "Category not found" });
//         }

//         // create new product
//         const product = new Product({
//             owner: 'owner', // assuming user is authenticated and req.user contains user information
//             name,
//             imageUrl,
//             category: category._id,
//             description,
//             price,
//             images,
//             videoUrl,
//             guarantee,
//             property,
//             madeIn,
//             year,
//         });

//         // save product to database
//         const savedProduct = await product.save();

//         // add product to category's products list
//         category.products.push(savedProduct._id);
//         await category.save();

//         return res.status(201).json(savedProduct);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error });
//     }

// };


