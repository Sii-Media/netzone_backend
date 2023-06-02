import express from 'express';
import { addCommentToNews, addLikeToNews, createNews, getAllNews, getComments, getLikes, getNewsById } from '../controllers/newsCtrl.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.get('/',  getAllNews);
router.get('/:id', getNewsById);
router.post('/createNews', createNews);
router.post('/:newsId/like', addLikeToNews);
router.post('/:newsId/comment', addCommentToNews);
router.get('/:newsId/comments',getComments);
router.get('/:newsId/likes', getLikes);



export default router;