const express = require("express");
const { login } = require("../controller/login.controller");
const signup = require("../controller/user.controller");
const userRouter = express.Router();


userRouter.post("/signup", signup)
userRouter.post('/login', login);
module.exports = userRouter;