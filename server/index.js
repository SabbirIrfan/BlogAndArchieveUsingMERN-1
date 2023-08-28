import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

import profileRoutes from './routes/profile.js'

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