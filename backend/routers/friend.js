const express = require('express');
const router = express.Router();
const friendsController = require('../src/controllers/friendsController');

// 친구 검색
router.get('/friends/search/:id', friendsController.searchFriend);
// 친구 요청 목록 불러오기
router.get('/friendsRequest',friendsController.getReceivedFriendRequests);
// 보낸 친구 요청 목록 불러오기
router.get('/sentfriendsRequest',friendsController.getSentFriendRequests);
// 친구 목록 불러오기
router.get('/friends',friendsController.FriendList);
// 친구 요청 보내기
router.post('/friends/:id', friendsController.sendFriendRequest);
// 친구 요청 수락
router.post('/friend_accept', friendsController.acceptFriendReq);
// 친구 요청 거절
router.post('/friend_reject', friendsController.rejectFriendRequest);
// 친구 삭제
router.delete('/friends/:userId', friendsController.removeFriend);
// 친구 요청 취소
router.post('/friend_cancel',friendsController.cancelFriendRequest);

module.exports = router;