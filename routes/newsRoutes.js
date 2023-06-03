import express from 'express';
import { addCommentToNews, createNews, getAllNews, getComments, getLikes, getNewsById, toggleLikeOnNews } from '../controllers/newsCtrl.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/createNews', createNews);
router.post('/:newsId/comment', addCommentToNews);
router.get('/:newsId/comments', getComments);
router.get('/:newsId/likes', getLikes);
router.post('/:newsId/toggleonlike', toggleLikeOnNews);



export default router;