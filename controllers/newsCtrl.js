import { News } from "../models/news/newsModel.js"

export const getAllNews = async (req, res) => {
    try {
        const data = await News.find({});
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
