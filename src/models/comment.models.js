const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true,  minlength: 1, maxlength: 500 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
  ],
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
