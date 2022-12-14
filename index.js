import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

import profileRoutes from './routes/profile.js'
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import findOrCreate from'mongoose-findorcreate';

const app = express();
dotenv.config();

// app.use(bodyParser.json({limit: "300mb", extended: true}));
// app.use(bodyParser.urlencoded({limit: "300mb", extended: true}));

app.use(express.json({limit: "300mb", extended: true}));
app.use(express.urlencoded({limit: "300mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);


// const CONNECTION_URL = 'mongodb+srv://nhfahimshah:12345fahim@cluster0.odpnf.mongodb.net/dataproject?retryWrites=true&w=majority';


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log('Server running on port: '+PORT)))
.catch((error) =>console.log(error.message));
// mongoose.set('useFindAndModify', false);