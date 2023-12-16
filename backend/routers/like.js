const express = require("express");
const router = express.Router();
const likeController = require("../src/controllers/likeController.js");

// 좋아요 추가
router.post("/like/:postId", likeController.addLike);
// 좋아요 취소
router.delete("/like/:postId", likeController.removeLike);
// 좋아요 개수 조회
router.get("/likes/count/:postId", likeController.getLikesCount);
// 특정 게시글의 모든 좋아요 조회
router.get('/likes/:postId', likeController.getLikesByPost);
// 좋아요 상태 조회
router.get('/likeStatus/:postId', likeController.checkUserLikeStatus);
module.exports = router;
