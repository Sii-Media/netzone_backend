import { CompanyServices } from "../models/company_services/company_service_model.js";



export const getCompanyServices = async (req, res) => {
    try {
        const { id } = req.params;
        const services = await CompanyServices.find({ owner: id }).populate('owner', 'username');
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addCompanyService = async (req, res) => {
    try {
        const { title, description, price, owner } = req.body;
        const image = req.files['image'] ? req.files['image'][0] : null;

        const imageUrl = image ? 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/') : null;


        const newService = new CompanyServices({
            title,
            description,
            price,
            owner,
            imageUrl: imageUrl,
        });
        await newService.save();
        res.status(201).json('The service has been added successfully');

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};