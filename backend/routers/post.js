var express = require("express");
const postController = require("../src/controllers/postController.js");
var router = express.Router();
const multer = require("../utils/multer.js");
//const auth = require('../src/middleware/auth.js')

// 게시글 생성
router.post("/post/:blogId", postController.createPost);
// 게시글 조회
router.get("/post/:id", postController.getPost);
// 게시글 수정
router.put("/post/:blogId/:id", postController.updatePost);
// 게시글 삭제
router.delete("/post/:blogId/:id", postController.deletePost);
// 내 모든 게시글 조회
router.get("/posts/:blogId", postController.getPostsByUser);
// 내 모든 게시글 조회(페이지 네이션)
router.get("/postPage", postController.getPostPageByUserPage);
// 특정 유저의 최신 게시물 3개 조회
router.get("/posts/:blogId/latest", postController.getLatestPostsByUser);
// 특정 유저의 특정 월의 감정 조회
router.get("/emotions/:blogId/:year/:month", postController.getEmotionsByMonth);
// 특정 달의 감정 카운트를 가져오는 라우트
router.get(
  "/posts/emotions/count/:blogId/:year/:month",
  postController.getEmotionCountByMonth
);
// 특정 달의 날씨별 게시글 통계를 가져오는 라우트
router.get(
  "/posts/weather/count/:blogId/:year/:month",
  postController.getWeatherStatsByMonth
);
// 이미지 업로드
router.post("/test/image", multer.upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.location; // 파일 URL

    res.status(200).send(imageUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
