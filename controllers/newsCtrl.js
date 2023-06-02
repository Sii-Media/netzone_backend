import { Comment } from "../models/news/comment_model.js";
import { Like } from "../models/news/likes_model.js";
import { News } from "../models/news/newsModel.js"

// export const getAllNews = async (req, res) => {
//     try {
//         const data = await News.find({}).populate('creator', '_id username profilePhoto');
//         if (!data) {
//             return res.status(404).json({ message: 'no Data Found' });
//         }
//         return res.json({
//             message: "success",
//             results: data,
//         });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }
export const getAllNews = async (req, res) => {
    try {
        const data = await News.find({})
            .populate('creator', '_id username profilePhoto')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username',
                },
            });

        if (!data) {
            return res.status(404).json({ message: 'No data found' });
        }

        return res.json({
            message: 'Success',
            results: data,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


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
        const image = req.files['image'][0]
        if (!image) { return res.status(404).json({ message: 'Attached file is not an image.' }); }
        const urlImage = 'https://net-zoon.onrender.com/' + image.path.replace(/\\/g, '/');

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


export const addLikeToNews = async (req, res) => {
    try {
        const { newsId } = req.params;
        const { userId } = req.body;

        const like = new Like({
            user: userId,
            news: newsId,
        });

        await like.save();

        const news = await News.findById(newsId);
        news.likes.push(like._id);
        await news.save();

        res.status(200).json("Like added successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

export const addCommentToNews = async (req, res) => {
    try {
        const { newsId } = req.params;
        const { userId, text } = req.body;

        const comment = new Comment({
            user: userId,
            news: newsId,
            text,
        });

        await comment.save();

        const news = await News.findById(newsId);
        news.comments.push(comment._id);
        await news.save();

        res.status(200).json("Comment added successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getComments = async (req, res) => {
    try {
        const { newsId } = req.params;

        const comments = await Comment.find({ news: newsId })
            .populate({
                path: "user",
                select: "username",
            })
            .select("text user");

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLikes = async (req, res) => {
    try {
        const { newsId } = req.params;

        const likes = await Like.find({ news: newsId });

        res.status(200).json({ likes });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
