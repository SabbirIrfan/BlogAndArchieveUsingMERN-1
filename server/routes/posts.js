import express from 'express';

import { getPosts, getPostsBySearch,  commentPost, getPost, createPost, updatePost, likePost, deletePost, getSingleUserPosts} from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/single/:id', getSingleUserPosts);
 router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);
export default router;