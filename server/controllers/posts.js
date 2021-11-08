import PostMessage from "../models/postMessage.js";
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

export const getPosts = async (req, res)=>{
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res)=>{
    const post = req.body;
    
    const newPost = new PostMessage(post);
    // console.log(newPost);
    
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id");
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatePost);

}


export default router;