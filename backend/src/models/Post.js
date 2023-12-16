const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author_id: { type: String, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: String },
    mood: { type: mongoose.Schema.Types.ObjectId, ref: "Emotion" },
    weather: { type: mongoose.Schema.Types.ObjectId, ref: "Weather" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
