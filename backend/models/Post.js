const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    required: true,
  },
  likes: [{}],
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
      date: Date,
    },
  ],
});

module.exports = mongoose.model("Post", PostSchema);
