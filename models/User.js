const mongoose = require("mongoose");
// TODO:  omitUndefined: true
const UserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: Date,
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
    enum: { values: ["Hombre", "Mujer", "Otro"] },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  photo: {
    type: Object,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  stories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Storie",
    },
  ],
  links: [
    {
      type: String,
    },
  ],
  savedposts: [{}],
});

function arrayLimit(val) {
  return val.length <= 7;
}

module.exports = mongoose.model("User", UserSchema);
