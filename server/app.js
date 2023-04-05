const express = require("express");
const app = express();
const mongooseConnect = require("./db/connect");
require("dotenv").config();
const Song = require("./model/songModel");
const User = require("./model/userModel");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

// get user details based on
app.get("/getuser", async (req, res, next) => {
  try {
    let { name } = req.params;
    name = await User.findByName(name);
    if (!name) {
      return next(new Error("User with the given name does not exist", 404));
    }
    res.status(200).json(name);
  } catch (error) {
    return next(new Error("User with the given name does not exist", 404));
  }
});

// get the details of all the song from the database
app.get("/", async (req, res, next) => {
  try {
    const data = await Song.find({});
    if (!data) {
      return next(new Error("No song exists", 404));
    }
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
});

app.post("/update", async (req, res, next) => {
  try {
    const { userName } = req.params;
    const user = await User.findOneAndUpdate(
      {
        userName: userName,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    console.log(process.env.MONGO_LOCAL_URI);
    await mongooseConnect(process.env.MONGO_LOCAL_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
