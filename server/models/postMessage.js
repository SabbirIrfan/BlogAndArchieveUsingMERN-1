import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    name: String,
    tags: [String],
    num: Number,
    selectedFile: String,
    comments: { type: [String], default: [] },
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    creatorImgUrl: { type: String },
    creatorEmail: {type : String},
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;