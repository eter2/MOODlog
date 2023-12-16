const FriendList = require('../models/Friend/FriendList');
const FriendRequest = require('../models/Friend/FriendRequest');
const User = require('../models/User');
const Profile = require('../models/Profile');
const jwt = require("../../utils/jwt");

exports.findFriendById = async (Id) => {
    try {
        const user = await User.findOne({ id : Id });
        console.log(user);
        if (!user) {
          return null;
        }
    
        const profile = await Profile.findOne({ id: user.id });
        return profile;
      } catch (error) {
        throw error;
      }
    };

exports.getFriendList = async(userId) => {

    const friendRequests = await FriendList.find({ userId: userId });

    return friendRequests;
}

exports.sendFriendRequest = async (senderId, receiverId) => {
    try {
        if (senderId === receiverId) {
            throw new Error('You cannot send a friend request to yourself.');
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        });
        if (existingRequest) {
            throw new Error('Friend request already sent.');
        }
        const friendRequest = new FriendRequest({ senderId, receiverId });
        await friendRequest.save();

        return friendRequest;
    } catch (error) {
        throw error;
    }
};

exports.getReceivedFriendRequests = async (userId) => {

    const receiver_id = userId;

    const friendRequests = await FriendRequest.find({ receiverId: receiver_id });
    return friendRequests;
};

exports.getSentFriendRequests = async (userId) => {

    const sender_id = userId;
    const friendRequests = await FriendRequest.find({ senderId: sender_id });
    return friendRequests;
};

exports.acceptFriendRequest = async (requestId, userId) => {

    const request = await FriendRequest.findOne({ senderId: requestId, receiverId: userId });

    if (!request) {
        throw new Error('Friend request not found or not for this user.');
    }

    const existingFriendship = await FriendList.findOne({
        userId: requestId,
        friendId: userId
    });

    if (existingFriendship) {
        throw new Error('You are already friends.');
    }

    const senderFriendListEntry = await FriendList.findOneAndUpdate(
        { userId: requestId },
        { $push: { friendId: userId } },
        { upsert: true, new: true }
    );

    const receiverFriendListEntry = await FriendList.findOneAndUpdate(
        { userId: userId },
        { $push: { friendId: requestId } },
        { upsert: true, new: true }
    );
    console.log(receiverFriendListEntry);
    await FriendRequest.deleteOne({ senderId: requestId,receiverId: userId });
    return receiverFriendListEntry;
};

exports.rejectFriendRequest = async (requestId, userId) => {
    await FriendRequest.deleteOne({ senderId: requestId,receiverId: userId });
};

exports.removeFriend = async (userId, friendId) => {

    const result1 = await FriendList.updateOne({ userId: userId }, { $pull: { friendId: friendId } });
    const result2 = await FriendList.updateOne({ userId: friendId }, { $pull: { friendId: userId } });

    console.log(result1);
    console.log(result2);

    if (result1.nModified === 0 || result2.nModified === 0) {
        throw new Error('Friend not found or already removed.');
    }


};
