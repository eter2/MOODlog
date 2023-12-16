const friendsService = require('../services/friendsService');
const jwt = require("../../utils/jwt");

// 친구 검색
exports.searchFriend = async (req, res) => {
    try {
      const userId = req.params.id;
      const friendProfile = await friendsService.findFriendById(userId);
      if (!friendProfile) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(friendProfile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
/**
 * 친구 요청 보내기
 */
exports.sendFriendRequest = async (req, res) => {
    try {
        const sender_id = req.id;
        const receiverId  = req.params.id;

        const friendRequest = await friendsService.sendFriendRequest(sender_id, receiverId);
        res.status(201).json(friendRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
/**
 * 받은 친구 요청 목록 조회
 */
exports.getReceivedFriendRequests = async (req,res) =>{
    try{

        const userId = req.id;
        const friendRequests = await friendsService.getReceivedFriendRequests(userId);
        res.status(200).json(friendRequests);

    } catch (error){
        res.status(400).json({message: error.message})
    }
}
/**
 * 보낸 친구 요청 목록 조회
 */
exports.getSentFriendRequests = async (req,res) =>{
    try{

        const userId = req.id;
        const friendRequests = await friendsService.getSentFriendRequests(userId);
        res.status(200).json(friendRequests);

    } catch (error){
        res.status(400).json({message: error.message})
    }
}
/**
// 친구 목록 조회
*/
exports.FriendList = async (req,res) => {
    try{
        const userId = req.id;

        const FriendList = await friendsService.getFriendList(userId);

        res.status(200).json(FriendList);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
}


/**
 * 친구 요청 수락
 */
exports.acceptFriendReq = async (req, res) => {
    try {
        const userId = req.id;
        const { requestId } = req.body;


        const friendListEntry = await friendsService.acceptFriendRequest(requestId, userId);
        res.status(200).json(friendListEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


/**
 * 친구 요청 거절
 */
exports.rejectFriendRequest = async (req, res) => {
    try {

        const userId = req.id;
        const { requestId } = req.body;

        await friendsService.rejectFriendRequest(requestId, userId);
        res.status(200).json({ message: 'Friend request rejected.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * 친구 요청 취소
 */
exports.cancelFriendRequest = async (req,res) => {
    try {

        const userId = req.id;
        const { requestId } = req.body;

        await friendsService.rejectFriendRequest(userId, requestId);
        res.status(200).json({ message: 'Friend request canceled.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

/**
 * 친구 삭제
 */
exports.removeFriend = async (req, res) => {
    try {
        const userId = req.id;
        const friendId = req.params.userId;
        console.log(userId);
        console.log(friendId);
        await friendsService.removeFriend(userId, friendId);
        res.status(200).json({ message: 'Friend removed.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
