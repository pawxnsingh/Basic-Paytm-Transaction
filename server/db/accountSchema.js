const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/");
const accountSchema = new mongoose.Schema({
  userId: {
    // this will reference the object of another collection
    type: mongoose.Schema.Types.ObjectId,
    refs: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const Account = mongoose.model("account", accountSchema);
module.exports = Account;
