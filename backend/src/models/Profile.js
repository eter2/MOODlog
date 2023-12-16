const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    id: { type: String, ref: 'User' },
    blog_name : String,
    image: String,
    username: { type: String, required: true, unique: true },
    about: String
},{ timestamps: true });

module.exports = mongoose.model("Profile",profileSchema);
