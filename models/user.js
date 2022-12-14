import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
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
userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);
var User = mongoose.model('User', userSchema);

export default User;
