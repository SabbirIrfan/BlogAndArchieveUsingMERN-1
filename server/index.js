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
app.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

/////

const userSchema1 = mongoose.Schema({
    name: { type: String},
    email: { type: String},
    password: { type: String},
    id: { type: String },
    profileImg: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png"
    },
    googleId: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: ''
    },
    imageData: {
        type: String,
        default: ''
    },
    linkedIn: {
        type: String,
        default: ''
    },
    github: {
        type: String,
        default: ''
    },
    social: {
        type: String,
        default: ''
    },
    institude: {
        type: String,
        default: ''
    }
})
userSchema1.plugin(passportLocalMongoose);
userSchema1.plugin(findOrCreate);
const User = new mongoose.model("User1", userSchema1);
////

// const CONNECTION_URL = 'mongodb+srv://nhfahimshah:12345fahim@cluster0.odpnf.mongodb.net/dataproject?retryWrites=true&w=majority';

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function (accessToken, refreshToken, profile, cb) {
    // console.log(profile)
    User.findOrCreate({email:profile._json.email, googleId: profile.id, username: profile.displayName, imageUrl: profile.photos[0].value }, function (err, user) {
      return cb(err, user);
    });
  }
));

// app.get("/auth/google",
//   passport.authenticate("google", { scope: [
//         "https://www.googleapis.com/auth/userinfo.profile",
//         "https://www.googleapis.com/auth/userinfo.email"
//       ] })
// );

app.get("/logout", function(req, res){
  res.redirect("http://localhost:3000/");
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/auth" }),
    function (req, res) {
        // Successful authentication, redirect secrets.
        res.redirect("http://localhost:3000/posts");
    });



const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log('Server running on port: '+PORT)))
.catch((error) =>console.log(error.message));
// mongoose.set('useFindAndModify', false);