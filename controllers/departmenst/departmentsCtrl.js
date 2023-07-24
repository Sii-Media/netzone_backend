import { Departments } from "../../models/product/departmenst/departmenst_model.js";
import { DepartmentsCategory } from "../../models/product/departmenst/categories/departments_categories_model.js";
import { Product } from "../../models/product/product.js";
import { deleteFile } from '../../utils/file.js';
import mongoose from "mongoose";
import userModel from "../../models/userModel.js";
// import upload from "../../middlewares/upload.js";
// import multer from "multer";

export const getAllProducts = async (req, res) => {
    try {
        const { country } = req.query;
        let products;

        if (country) {
            products = await Product.find({ country })
                .populate('category', 'name')
                .populate('owner', 'username userType');
        } else {
            products = await Product.find()
                .populate('category', 'name')
                .populate('owner', 'username userType');
        }

        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId).populate('category', 'name').populate('owner', 'username');
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const filterOnProducts = async (req, res) => {
    try {
        const { country, priceMin, priceMax, owner, condition } = req.query;
        let query = {};
        if (country) {
            query.country = country;
        }

        if (priceMin && !isNaN(priceMin)) {
            query.price = { $gte: parseFloat(priceMin) };
        }

        if (priceMax && !isNaN(priceMax)) {
            if (query.price) {
                query.price.$lte = parseFloat(priceMax);
            } else {
                query.price = { $lte: parseFloat(priceMax) };
            }
        }

        if (owner) {
            // Find the owner by name and retrieve its ObjectId
            const foundOwner = await userModel.findOne({ username: owner });
            if (foundOwner) {
                query.owner = foundOwner._id; // Use the ObjectId in the query
            } else {
                // Handle the case where the owner name is not found
                return res.status(404).json({ message: "Owner not found" });
            }
        }

        if (condition) {
            query.condition = condition;
        }
        let products = await Product.find(query)
            .populate('category', 'name')
            .populate('owner', 'username userType');
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

// export const getProductsByCategory = async (req, res) => {
//     try {
//         const { country } = req.query;

//         const { department, category } = req.body;

//         await Product.find();

//         const departments = await Departments.findOne({ name: department });
//         if (!departments) {
//             return res.status(404).json({ message: `Department ${department} not found` });
//         }
//         console.log(departments._id);
//         // const categories = await DepartmentsCategory.findOne({ name: category, department: departments._id }).populate('products').populate({
//         //     path: 'products',
//         //     populate: {
//         //         path: 'category',
//         //         select: 'name',
//         //     },
//         // });
//         const categories = await DepartmentsCategory.findOne({ name: category, department: departments._id })
//             .populate({
//                 path: 'products',
//                 populate: [
//                     {
//                         path: 'category',
//                         select: 'name',
//                     },
//                     {
//                         path: 'owner',
//                         select: 'username',
//                     },
//                 ],
//             });
//         console.log(categories);
//         if (!categories) {
//             return res.status(404).json({ message: `Category ${category} not found in department ${department}` });
//         }
//         categories.products.category = category;
//         const products = await categories.products.filter(product => product.country === country);

//         if (products) {
//             return res.json({
//                 message: "success",
//                 department,
//                 category,
//                 results: products,
//             });
//         } else {
//             res.status(404).send(`Category ${category} not found in department ${department}`);

//         }
//     } catch (error) {
//         return res.status(500).json({ message: error.message });

//     }
// };

export const getProductsByCategory = async (req, res) => {
    try {
        const { country, priceMin, priceMax, owner, condition } = req.query;

        const { department, category } = req.body;

        await Product.find();

        const departments = await Departments.findOne({ name: department });
        if (!departments) {
            return res.status(404).json({ message: `Department ${department} not found` });
        }

        const categories = await DepartmentsCategory.findOne({ name: category, department: departments._id })
            .populate({
                path: 'products',
                populate: [
                    {
                        path: 'category',
                        select: 'name',
                    },
                    {
                        path: 'owner',
                        select: 'username',
                    },
                ],
            });

        if (!categories) {
            return res.status(404).json({ message: `Category ${category} not found in department ${department}` });
        }

        // Apply the filters based on the provided query parameters
        const filteredProducts = categories.products.filter((product) => {
            // Filter by country
            if (country && product.country !== country) {
                return false;
            }

            // Filter by priceMin
            if (priceMin && parseFloat(product.price) < parseFloat(priceMin)) {
                return false;
            }

            // Filter by priceMax
            if (priceMax && parseFloat(product.price) > parseFloat(priceMax)) {
                return false;
            }

            // Filter by owner
            if (owner && product.owner.username !== owner) {
                return false;
            }

            // Filter by condition
            if (condition && product.condition !== condition) {
                return false;
            }

            return true;
        });

        if (filteredProducts.length === 0) {
            return res.status(404).json("No products found with the provided filters");
        }

        return res.json({
            message: "success",
            department,
            category,
            results: filteredProducts,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const addProduct = async (req, res) => {
    try {
        const { departmentName, categoryName } = req.body;
        const { owner, name, condition, description, price, quantity, guarantee, address, madeIn, year, discountPercentage, country, color } = req.body;
        const image = req.files['image'][0];

        const ownerId = new mongoose.Types.ObjectId(owner);
        // const existingUser = await userModel.findOne({ _id: ownerId });
        // if (!existingUser) {
        //     return res.status(500).json({ message: "User don't exists" });
        // }
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

        let discountedPrice = price;
        if (discountPercentage && discountPercentage >= 1 && discountPercentage <= 100) {
            const discount = price * (discountPercentage / 100);
            discountedPrice = price - discount;
        }

        const productData = {
            owner: ownerId, // assuming user is authenticated and req.user contains user information
            name,
            imageUrl: urlImage,
            category: category._id,
            condition: condition,
            description,
            price,
            quantity,
            guarantee,
            address,
            madeIn,
            year,
            discountPercentage,
            priceAfterDiscount: discountedPrice,
            country: country,
            color
        };

        if (req.files['productimages']) {
            const productImages = req.files['productimages'];
            const imageUrls = [];
            if (!productImages || !Array.isArray(productImages)) {
                return res.status(404).json({ message: 'Attached files are missing or invalid.' });
            }

            for (const image of productImages) {
                if (!image) {
                    return res.status(404).json({ message: 'Attached file is not an image.' });
                }

                const imageUrl = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');
                imageUrls.push(imageUrl);
                productData.images = imageUrls;
            }
        }

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

        return res.status(201).json(savedProduct._id);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
};

export const editProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, price, guarantee, address, madeIn, year } = req.body;
        let urlImage;
        if (req.files && req.files["image"]) {
            const profilePhoto = req.files["image"][0];
            urlImage =
                "https://net-zoon.onrender.com/" +
                profilePhoto.path.replace(/\\/g, "/");
        }
        // const image = req.files['image'][0];
        // if (!image) {
        //     return res.status(404).json({ message: 'Attached file is not an image.' });
        // }

        // const urlImage = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');
        let updatedProduct;
        if (req.files && req.files["image"]) {
            updatedProduct = await Product.findByIdAndUpdate(
                productId,
                {
                    name: name,
                    imageUrl: urlImage,
                    description: description,
                    price: price,
                    guarantee: guarantee,
                    address: address,
                    madeIn: madeIn,
                    year: year,
                },
                { new: true }
            );

        } else {
            updatedProduct = await Product.findByIdAndUpdate(
                productId,
                {
                    name: name,

                    description: description,
                    price: price,
                    guarantee: guarantee,
                    address: address,
                    madeIn: madeIn,
                    year: year,
                },
                { new: true }
            );
        }
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Add optional fields if they exist
        if (req.files['video']) {
            const video = req.files['video'][0];
            const urlVideo = 'https://net-zoon.onrender.com/' + video.path.replace(/\\/g, '/');
            updatedProduct.vedioUrl = urlVideo;
        }

        if (req.files['gif']) {
            const gif = req.files['gif'][0];
            const gifUrl = 'https://net-zoon.onrender.com/' + gif.path.replace(/\\/g, '/');
            updatedProduct.gifUrl = gifUrl;
        }

        await updatedProduct.save();

        return res.status(200).json('success');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        // const product = await Product.findById(productId);

        // deleteFile(product.imageUrl);
        const deletedProduct = await Product.findByIdAndRemove(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }


        return res.status(200).json('success');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
};





export const getUserProducts = async (req, res) => {
    const { userId } = req.body;
    const ownerId = new mongoose.Types.ObjectId(userId); // Convert userId to ObjectId

    try {
        const products = await Product.find({ owner: ownerId }).populate('category', 'name').populate('owner', 'username');
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};



