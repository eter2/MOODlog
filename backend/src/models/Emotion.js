const mongoose = require("mongoose");

const emotionSchema = new mongoose.Schema({
    emotion_name : { type : String, required: true, unique: true},
    color : { type : String, required: true, unique: true}
}, { timestamps: true });

module.exports = mongoose.model("Emotion", emotionSchema);
