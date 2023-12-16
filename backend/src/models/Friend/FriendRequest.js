// FriendRequest.js
const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
    senderId: { type : String , required: true},
    receiverId: { type : String, required: true},
    isConfirm: { type: Boolean, default: false }
},{timestamps: { createdAt: 'created_at'}});

module.exports = mongoose.model('FriendRequest', friendRequestSchema);
