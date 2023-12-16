const Emotion = require("../models/Emotion");

exports.createEmotion = async (data) => {
    const emotion = new Emotion(data);
    return emotion.save();
};

exports.getEmotionById = async (id) => {
    return Emotion.findById(id);
};

exports.getEmotionByName = async (mood) => {
    return Emotion.findOne({emotion_name : mood});
};

exports.getAllEmotions = async () => {
    return Emotion.find({});
};

exports.updateEmotion = async (id, data) => {
    return Emotion.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteEmotion = async (id) => {
    return Emotion.findByIdAndDelete(id);
};
