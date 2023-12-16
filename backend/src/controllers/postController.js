const postService = require("../services/postService");
const emotionService = require("../services/emotionService");
const weatherService = require("../services/weatherService");

// 게시글 생성
exports.createPost = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (blogId !== req.id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this comment" });
    }
    const { title, content, images, mood, weather } = req.body;
    emotion = await emotionService.getEmotionByName(mood);
    if (!emotion) {
      res.status(400).json({ message: "no emotion" });
    }
    Weather = await weatherService.getWeatherByName(weather);
    if (!weather) {
      res.status(400).json({ message: "no weather" });
    }

    const postData = {
      author_id: blogId,
      title: title,
      content: content,
      images: images || "",
      mood: emotion._id,
      weather: Weather._id,
    };
    const newPost = await postService.createPost(postData);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 게시글 수정
exports.updatePost = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (blogId !== req.id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this comment" });
    }

    const post = await postService.updatePost(req.params.id, req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 한 유저의 모든 게시글 조회
exports.getPostsByUser = async (req, res) => {
  try {
    const { blogId } = req.params;
    const posts = await postService.getPostsByUser(blogId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 게시글 조회
exports.getPost = async (req, res) => {
  try {
    const post = await postService.getPost(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (blogId !== req.id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this comment" });
    }

    const deletedPost = await postService.deletePost(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 특정 유저의 최신 게시물 3개 조회
exports.getLatestPostsByUser = async (req, res) => {
  try {
    const { blogId } = req.params;
    const posts = await postService.getLatestPostsByUser(blogId, 3);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 특정 유저의 특정 월의 감정 조회
exports.getEmotionsByMonth = async (req, res) => {
  try {
    const { blogId, year, month } = req.params;
    const emotions = await postService.getMoodsByMonth(blogId, year, month);
    res.status(200).json(emotions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getPostPageByUserPage = async (req, res) => {
  try {
    const user_id = req.id;


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await postService.getPostPageByUser(user_id, skip, limit);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 감정 통계
exports.getEmotionCountByMonth = async (req, res) => {
  try {
    const { blogId, year, month } = req.params;
    const emotionCount = await postService.getMoodStatisticsByMonth(
      blogId,
      year,
      month
    );
    res.status(200).json(emotionCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWeatherStatsByMonth = async (req, res) => {
  try {
    const { blogId, year, month } = req.params;
    const weatherStats = await postService.getWeatherCount(blogId, year, month);
    res.status(200).json(weatherStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
