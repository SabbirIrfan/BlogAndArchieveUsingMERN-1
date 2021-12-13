import mongoose from 'mongoose';

const resources = mongoose.Schema({
    title: String,
    creator: String,
    name: String,
    selectedFile: String,
    
})

var  Resources = mongoose.model('Resources', resources);

export default Resources;  