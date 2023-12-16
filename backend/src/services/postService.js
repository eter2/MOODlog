const Post = require("../models/Post");
const Emotion = require("../models/Emotion");
const Weather = require("../models/Weather");

// 게시글 생성
exports.createPost = async (postData) => {
  const post = new Post(postData);
  return await post.save();
};

// 게시글 수정
exports.updatePost = async (postId, updatedData) => {
  const post = await Post.findById(postId);
  if (updatedData.title) {
    post.title = updatedData.title;
  }

  if (updatedData.content) {
    post.content = updatedData.content;
  }

  if (updatedData.images) {
    post.images = updatedData.images;
  }

  if (updatedData.mood) {
    post.mood = updatedData.mood;
  }
  // 게시글 저장
  await post.save();
  return await Post.findById(postId);
};

exports.getPost = async (postId) => {
  // 'mood'와 'weather' 필드에 대한 상세 정보를 포함하여 게시글 조회
  return await Post.findById(postId).populate("mood").populate("weather");
};

// 게시글 삭제
exports.deletePost = async (postId) => {
  return await Post.findByIdAndDelete(postId);
};

// 내 게시글 조회
exports.getPostsByUser = async (userId) => {
  console.log(userId);
  return await Post.find({ author_id: userId }).sort({ createdAt: -1 });
};

// postService 내부의 getPostsByUser 함수
exports.getPostPageByUser = async (userId, skip, limit) => {
  return await Post.find({ user_id: userId }).skip(skip).limit(limit);
};

// 특정 유저의 최신 게시물 3개 조회
exports.getLatestPostsByUser = async (userId, limit) => {
  return await Post.find({ author_id: userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

exports.getMoodsByMonth = async (userId, year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  const posts = await Post.aggregate([
    {
      $match: {
        author_id: userId,
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $project: {
        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        mood: 1,
      },
    },
    {
      $group: {
        _id: "$date",
        moods: { $push: "$mood" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]).exec();

  for (let post of posts) {
    await Promise.all(
      post.moods.map(async (moodId) => {
        return Emotion.findById(moodId).exec();
      })
    ).then((filledMoods) => {
      post.moods = filledMoods;
    });
  }

  return posts;
};

exports.getMoodStatisticsByMonth = async (userId, year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  console.log(startDate, endDate);

  const allEmotions = await Emotion.find({}).exec();

  const moodStats = await Post.aggregate([
    {
      $match: {
        author_id: userId,
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: "$mood", count: { $sum: 1 } } },
  ]).exec();

  const emotionStats = allEmotions.map((emotion) => {
    const found = moodStats.find(
      (stat) => stat._id.toString() === emotion._id.toString()
    );
    return {
      emotion: emotion.emotion_name,
      color: emotion.color,
      count: found ? found.count : 0,
    };
  });

  return emotionStats;
};

exports.getWeatherCount = async (userId, year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  console.log(startDate, endDate);

  const allWeathers = await Weather.find({}).exec();

  const weatherStats = await Post.aggregate([
    {
      $match: {
        author_id: userId,
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: "$weather", count: { $sum: 1 } } },
  ]).exec();

  const weatherStatistics = allWeathers.map((weather) => {
    const found = weatherStats.find(
      (stat) => stat._id.toString() === weather._id.toString()
    );
    return {
      weather: weather.weather_name,
      color: weather.color,
      count: found ? found.count : 0,
    };
  });

  return weatherStatistics;
};
