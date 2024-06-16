// here we have to create and export the router in order
// this router is going to handle in /api/v1
const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");
const router = express.Router();
router.use("/user", userRouter);
router.use("/account", accountRouter);
// this is the old way to export the module in the javascript, basically this is <ES6
module.exports = router;
