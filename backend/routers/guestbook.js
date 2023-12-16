const express = require("express");
const router = express.Router();
const guestbookController = require("../src/controllers/guestbookController");
const commentController = require("../src/controllers/commentController");

// 방명록 추가
router.post("/guest_comments/:BlogId", guestbookController.createGuestComment);
// 방명록 조회
router.get("/guest_comments/:BlogId", guestbookController.getGuestComment);
// 방명록 수정
router.put("/guest_comments/:ownerId/:GuestBookId",guestbookController.updateGuestComment);
// 방명록 삭제
router.delete("/guest_comments/:GuestBookId",guestbookController.deleteGuestComment);
// 방명록 대댓글 추가
//router.post('/guest_comments/:commentId/replies', guestbookController.addReply);

module.exports = router;
