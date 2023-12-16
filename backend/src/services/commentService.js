const Comment = require('../models/Comment');

exports.createComment = async (data) => {
    const comment = new Comment(data);
    return await comment.save();
};

exports.getComment = async (commentId) => {
    return await Comment.findById(commentId);
};

exports.updateComment = async (commentId, data) => {
    return await Comment.findByIdAndUpdate(commentId, data, { new: true });
};

exports.deleteComment = async (commentId) => {
    return await Comment.findByIdAndDelete(commentId);
};

exports.getCommentsByPost = async (postId) => {
    return await Comment.find({ post_id: postId }).sort({ created_at: -1 });
};