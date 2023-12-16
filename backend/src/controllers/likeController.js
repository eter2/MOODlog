const likeService = require("../services/likeService");
const Like = require("../models/Like");

exports.addLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.id;
    const existingLike = await Like.findOne({ post_id: postId, id: userId });
    if (existingLike) {
      return res.status(409).json({ message: "Like already exists" });
    }
    await likeService.addLike(postId, userId);
    res.status(201).json({ message: "Like added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeLike = async (req, res) => {
  try {
    const { postId } = req.params;
    await likeService.removeLike(postId, req.id);
    res.status(200).json({ message: "Like removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLikesCount = async (req, res) => {
  try {
    const { postId } = req.params;
    const count = await likeService.getLikesCount(postId);
    res.status(200).json({ count });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getLikesByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await likeService.getLikesByPost(postId);
    res.status(200).json(likes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.checkUserLikeStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    const isLiked = await likeService.checkLike(postId, req.id);
    res.status(200).json({ liked: isLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
