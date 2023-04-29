import { Advertisement } from "../models/advertisements/advertisementsModel.js";


export const getAdvertisements = async (req, res) => {

    try {

        const data = await Advertisement.find({});
        return res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

};

export const getAdvertisementById = async (req, res) => {
    const { id } = req.params;
    try {

        const data = await Advertisement.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            msg: "success",
            results: data,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}