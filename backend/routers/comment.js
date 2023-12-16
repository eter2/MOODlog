var express = require('express');
const commentController = require("../src/controllers/commentController.js");
var router = express.Router();

// 댓글 생성
router.post('/comment', commentController.createComment);
// 댓글 조회
router.get('/comment/:commentId', commentController.getComment);
// 댓글 수정
router.put('/comment/:commentId', commentController.updateComment);
// 댓글 삭제
router.delete('/comment/:commentId', commentController.deleteComment);
// 특정 게시글에 달린 댓글들 조회
router.get('/comments/:postId', commentController.getCommentsByPost);

module.exports = router;