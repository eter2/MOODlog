const mongoose = require("mongoose");

const FriendListSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    friendId: [{ type: String, required: true, index: true }]
},  {timestamps: { createdAt: 'created_at'}});

module.exports = mongoose.model("FriendList",FriendListSchema);

