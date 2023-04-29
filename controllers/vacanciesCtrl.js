import { Vacancies } from "../models/vacanciesModel.js";


export const getVacancies = async (req, res) => {
    try {
        const data = await Vacancies.find({});
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
};