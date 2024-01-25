const apiRouter = require("express").Router();
const { userRouter } = require("./users");

apiRouter.use("/user", userRouter);

module.exports = {
    apiRouter
}