const mongoose = require("mongoose");

const StorieSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
    }
})

module.exports = mongoose.model("Storie", StorieSchema)
