import express from 'express';

import {deletePdf, addpdf,getPdfs, getPosts,getContributionData, getPostsBySearch,Contribute , getContributedPostsById,  commentPost, getPost, createPost, updatePost, likePost, deletePost, getSingleUserPosts} from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/pdfs', getPdfs);
router.post('/addpdf',  addpdf );
router.delete('/pdfs/delete/:id', deletePdf);

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/single/:id', getSingleUserPosts);
router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);
router.patch('/contribute/:id', Contribute);
router.get('/contributedpost/:id', getContributedPostsById);
router.get('/getbyId/:id', getContributionData);
export default router;