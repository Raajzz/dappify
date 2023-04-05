const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  songName: {
    type: String,
    required: [true, "songName is a required field"],
    trim: true,
    minlength: [1, "Length of the Name must be at least a character long"],
  },
  songHash: {
    type: String,
    required: [true, "songHash is a required field"],
    trim: true,
  },
  artistName: {
    type: String,
    required: [true, "artistName is a required field"],
    trim: true,
    maxlength: [30, "Length of the Name must be less than 30 characters long"],
    minlength: [1, "Length of the Name must be at least a character long"],
  },
  artistWallet: {
    type: String,
    required: [true, "artistWallet is a required field"],
    trim: true,
  },
  songUrl: {
    type: String,
    required: [true, "songUrl is a required field"],
  },
  songImgUrl: {
    type: String,
    required: [true, "songImgUrl is a required field"],
  },
});

module.exports = mongoose.model("Song", SongSchema);
