const apiRouter = require("express").Router();
const { accountRouter }= require("./accounts");
const { userRouter } = require("./users");

apiRouter.use("/user", userRouter);
apiRouter.use("/account", accountRouter);

module.exports = {
    apiRouter
}