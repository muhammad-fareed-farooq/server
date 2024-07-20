const mongoose = require("mongoose");

const users = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  // last_Name: {
  //   type: String,
  //   required: true,
  // },
  // profilePic: {
  //   type: String,
  //   required: true,
  // },
  login_count: {
    type: Number,
    default: 0,
  },
});

const Users_Schema = mongoose.model("users", users);

module.exports = Users_Schema;
