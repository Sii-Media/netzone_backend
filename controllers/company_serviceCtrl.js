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

        const newService = new CompanyServices({
            title,
            description,
            price,
            owner
        });
        await newService.save();
        res.status(201).json('The service has been added successfully');

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};