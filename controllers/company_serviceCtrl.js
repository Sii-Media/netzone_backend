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
        const { title, description, price, owner, whatsAppNumber } = req.body;
        const image = req.files['image'] ? req.files['image'][0] : null;

        const imageUrl = image ? 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/') : null;



        const newService = new CompanyServices({
            title,
            description,
            price,
            owner,
            imageUrl: imageUrl,
            whatsAppNumber: whatsAppNumber,
        });



        if (req.files['serviceImageList']) {
            const serviceImages = req.files['serviceImageList'];
            const imageUrls = [];
            if (!serviceImages || !Array.isArray(serviceImages)) {
                return res.status(404).json({ message: 'Attached files are missing or invalid.' });
            }

            for (const image of serviceImages) {
                if (!image) {
                    return res.status(404).json({ message: 'Attached file is not an image.' });
                }

                const imageUrl = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');
                imageUrls.push(imageUrl);
                newService.serviceImageList = imageUrls;
            }
        }

        await newService.save();
        res.status(201).json('The service has been added successfully');

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const editCompanyService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;
        const image = req.files['image'] ? req.files['image'][0] : null;

        // Check if the company service with the given ID exists
        const existingService = await CompanyServices.findById(id);
        if (!existingService) {
            return res.status(404).json({ message: 'Company service not found' });
        }

        // Update company service fields
        existingService.title = title;
        existingService.description = description;
        existingService.price = price;
        existingService.imageUrl = image ? 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/') : null;

        await existingService.save();
        res.json({ message: 'Company service updated successfully', updatedService: existingService });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCompanyService = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the company service with the given ID exists
        const existingService = await CompanyServices.findById(id);
        if (!existingService) {
            return res.status(404).json('Company service not found');
        }

        // Delete the company service
        await CompanyServices.findByIdAndRemove(id);

        res.json('Company service deleted successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
