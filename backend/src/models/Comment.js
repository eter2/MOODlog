const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post'
    },
    user_id: {
      type: String,
      required: true,
      ref: 'User'
    },
    content: {
      type: String,
      required: true
    }
  }, { timestamps: true });

module.exports = mongoose.model("Comment",commentSchema);