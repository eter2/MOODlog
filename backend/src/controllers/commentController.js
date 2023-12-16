const commentService = require('../services/commentService');

exports.createComment = async (req, res) => {
    try {
        const { post_id, content, user_id } = req.body;

        const commentData = {
            post_id,
            user_id,
            content
        };
        const comment = await commentService.createComment(commentData);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCommentsByPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await commentService.getCommentsByPost(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getComment = async (req, res) => {
    try {
        const comment = await commentService.getComment(req.params.commentId);
        res.status(200).json(comment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (comment.user_id !== req.id) {
            return res.status(403).json({ error: "You do not have permission to delete this comment" });
        }

        const updatedComment = await commentService.updateComment(req.params.commentId, req.body);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (comment.user_id !== req.id) {
            return res.status(403).json({ error: "You do not have permission to delete this comment" });
        }

        const deleteComment = await commentService.deleteComment(req.params.commentId);
        res.status(200).send(deleteComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

