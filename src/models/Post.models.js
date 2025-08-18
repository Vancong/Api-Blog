const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 400
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    thumbnail: {
        type: String, 
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
