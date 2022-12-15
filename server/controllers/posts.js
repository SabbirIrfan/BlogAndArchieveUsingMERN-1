import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';
import ContributedPostMessage from '../models/contributedPostDetails.js';
import Resources from '../models/Resources.js';

const router = express.Router();

function Random() {
  let temp = Math.floor(Math.random() * 31);
  return temp
}


export const addpdf = async (req, res) => {
    const userfile = req.body;
    // console.log(userfile);
    const newFile = new Resources(userfile);

    try {
        await newFile.save();
//    console.log(newFile);
        res.status(201).json(newFile);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const getPdfs = async (req, res) => {
    
    
    try {
        const pdfs = await Resources.find();
        // console.log(pdfs);
        res.json(pdfs);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const deletePdf = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Resources.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}




export const getPosts = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}



export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString(), num:Random() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id, num:Random()};

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const Contribute = async (req, res) => {

    const { id } = req.params;
    const value = req.body;
    const contributedPost1 = new ContributedPostMessage(value)
    await contributedPost1.save();
    // console.log("Hi in the server")
    const post = await PostMessage.findById(id);
    // console.log(post)
    post.contributedPost.push(contributedPost1);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    // console.log(updatePost)
    res.json(updatedPost);
}


export const getContributedPostsById = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        
        const post = await PostMessage.findById(id);
        
        await post.populate('contributedPost');
        const allpost = post.contributedPost;
        // console.log(allpost)
        // console.log(allpost)
        res.status(200).json(allpost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getContributionData = async (req, res) => { 
    const { id } = req.params;
    console.log(id)
    try {
        const post = await ContributedPostMessage.findById(id);
        console.log(post)
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}


export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};


export const getSingleUserPosts = async (req, res) => {
    const { id } = req.params;

    try {
        
        const posts = await PostMessage.find({ creatorEmail: id });

        res.json({ data: posts});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export default router;