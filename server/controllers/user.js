import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import express from 'express';
import mongoose from 'mongoose';
export const signin = async (req, res) => {
    const { email, password } = req.body;
    // console.log("Inside SIGN IN");
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "Please log in with a registered email." })
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credintials.' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' })
        
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({message: "Something went wrong."})
    }
}


        
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, imageUrl, googleId, institude, social, imageData,linkedIn,github } = req.body;
    // console.log("Inside SIGN UP");
    try {
        const existingUser = await User.findOne({ email });
        
        if (existingUser) return res.status(400).json({ message: "User already exists." })
        
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." })
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName} `, imageUrl, googleId, institude, social, imageData,linkedIn,github })
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })
        res.status(200).json({ result, token });
    } catch (error) {
         res.status(500).json({message: "Something went wrong."})
    }
}

export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const {name,email,password,profileImg,googleId,imageUrl,imageData,linkedIn,github,social,institude} = req.body;
    // const { temp } = updatedUserData;
    // console.log(temp)
    const updatedUserData = { name, email, password, profileImg, googleId, imageUrl, imageData, linkedIn, github, social, institude };
    // console.log(updatedUserData)
    try {
        
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with this id: ${id}`);

    await User.findByIdAndUpdate(id, updatedUserData, { new: true });

    res.json(updatedUserData);
    } catch (error) {
        res.status(404).json({message: "Something is wrong"})
    }

}