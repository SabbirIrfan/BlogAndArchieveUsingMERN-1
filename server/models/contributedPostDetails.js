import mongoose from 'mongoose';

const contributedPostSchema = mongoose.Schema({
    message: String,
    creator: { type: String, default: '' },
    name: String,
    selectedFile: { type: [String], default: [] },
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    creatorImgUrl: { type: String },
    creatorEmail: { type: String },
    accepted: {
        type: Boolean,
        default: "false"
    },
})

var ContributedPostMessage = mongoose.model('ContributedPostMessage', contributedPostSchema);

export default ContributedPostMessage;