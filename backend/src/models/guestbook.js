const mongoose = require('mongoose');

const GuestBookSchema = new mongoose.Schema({
    ownerId: { 
        type: String,
        required: true, 
        index: true 
    },
    authorId: { 
        type: String, 
        required: true 
    },
    comment: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('GuestBook', GuestBookSchema);