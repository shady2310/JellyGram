const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
