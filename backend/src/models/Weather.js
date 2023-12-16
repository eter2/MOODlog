const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    weather_name : { type : String, required: true, unique: true},
    color : { type : String, required: true, unique: true}
}, { timestamps: true });

module.exports = mongoose.model('Weather', weatherSchema);
