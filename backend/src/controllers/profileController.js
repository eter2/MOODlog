const Profile = require("../models/Profile");
const jwt = require("../../utils/jwt");
const profileService = require("../services/profileService");

exports.getProfileByUserId = async (req, res) => {
  try {
    console.log(req.id);

    const user_id = req.params.userId;
    const profile = await profileService.getProfileByUser(user_id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProfile = async (req, res) => {
  try {
    const profile = await profileService.getAllProfile();
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const user_id = req.id;
    // 새 프로필 객체 생성
    const Profile = new Profile({
      user_id: user_id,
      image: req.body.image,
      joinDate: new Date(), // 현재 날짜로 설정
      friendsCount: 0, // 기본값 0
      about: req.body.about,
    });

    // 데이터베이스에 저장
    const newProfile = await profileService.createProfile(Profile);

    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//프로필 수정
exports.updateProfile = async (req, res) => {
  try {
    const user_id = req.id;

    const updatedProfile = await Profile.findOneAndUpdate(
      { id: user_id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await profileService.deleteProfile(req.params.userId);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
