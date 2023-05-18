import { News } from "../models/news/newsModel.js"

export const getAllNews = async (req, res) => {
    try {
        const data = await News.find({});
        if (!data) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            message: "success",
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
        const { title, description, imgUrl, ownerName, ownerImage, creator } = req.body;
        const image = req.file;
        if (!image) { return res.status(404).json({ message: 'Attached file is not an image.' }); }
        const urlImage = 'http://10.0.2.2:5000/' + image.path.replace(/\\/g, '/');

        const news = new News({
            title,
            description,
            imgUrl: urlImage,
            ownerName,
            ownerImage,
            creator,
        });
        const savedNews = await news.save();
        // console.log(savedNews);
        res.status(201).json('success');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
