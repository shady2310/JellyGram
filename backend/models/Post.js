const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: Object,
    required: true,
  },
  imageId: {
    type: String,
  },
  likes: [{
    type: mongoose.Types.ObjectId,
    ref: "User",
  }],
  date: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Post", PostSchema);
