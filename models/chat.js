const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    UserId2: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    messages: [{
        type: String,
    }]
})