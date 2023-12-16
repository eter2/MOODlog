const Like = require('../models/Like');

exports.addLike = async (postId, userId) => {
    const like = new Like({ post_id: postId, id: userId });
    await like.save();
};

exports.removeLike = async (postId, userId) => {
    console.log(userId);
    await Like.findOneAndDelete({ post_id: postId, id: userId });

};

exports.getLikesCount = async (postId) => {
    return Like.countDocuments({ post_id: postId });
};

exports.getLikesByPost = async (postId) => {
    return await Like.find({ post_id: postId });
};

exports.checkLike = async (postId, userId) => {
    const like = await Like.findOne({ post_id: postId, id: userId });
    return like != null;
};