const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    email: String,
    authNumber: Number,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 180
    }
});

module.exports= mongoose.model("AuthNumber",authSchema);