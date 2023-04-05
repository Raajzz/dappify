const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Name is a required field"],
    trim: true,
    maxlength: [30, "Length of the Name must be less than 30 characters long"],
    minlength: [1, "Length of the Name must be at least a character long"],
  },
  userWallet: {
    type: String,
    required: [true, "artistWallet is a required field"],
    trim: true,
  },
  songsOwned: [
    {
      songName: {
        type: String,
      },
      songHash: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
