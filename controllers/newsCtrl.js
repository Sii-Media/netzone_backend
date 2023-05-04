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

export const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await News.findById(id);
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


export const createNews = async (req, res) => {
    try {
        const { title, description, imgUrl, owner, date } = req.body;
        const news = new News({
            title,
            description,
            imgUrl,
            owner,
            date,
        });
        const savedNews = await news.save();
        res.status(201).json({
            msg: 'success',
            result: savedNews,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
