import mongoose from 'mongoose';
import ContributedPostMessage from './contributedPostDetails.js';
// import Resources from './resources.js'

const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    name: String,
    tags: [String],
    num: Number,
    selectedFile: { type: [{}], default: [] },
    comments: { type: [String], default: [] },
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    creatorImgUrl: { type: String },
    creatorEmail: { type: String },
    contributedPost: [{ type: Schema.Types.ObjectId, ref: ContributedPostMessage, default: [] }]
    
})


var PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;