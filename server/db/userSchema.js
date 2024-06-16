const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/");
// this is the simple solution
// const userShema = new mongoose.Schema({
//     username: String,
//     firstname: String,
//     lastname: String,
//     password: String,
// });
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    // this will remove all the trailing whitespace from the "string" types
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
