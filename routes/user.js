const express = require("express");
const registration = require("../controller/user.controller");
const userRouter = express.Router();


userRouter.post("/registration", registration)

module.exports = userRouter;