const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    id: {
        type: String,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);