import mongoose from 'mongoose';

const resourceSchema = mongoose.Schema({
   
    selectedFile: { type: [String], default: [] },
    
})

var  Resources = mongoose.model('Resources', resourceSchema);

export default Resources;