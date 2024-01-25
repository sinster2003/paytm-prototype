const userRouter = require("express").Router(); // router object
const { signUp, signIn, updateProfile, filterUser } = require("../controllers/users");
const { authMiddleware } = require("../middleware");

// signup a user
userRouter.post("/signup", signUp);

// signin a user
userRouter.post("/signin", signIn);

// profile
userRouter.put("/", authMiddleware, updateProfile);

// filter
userRouter.get("/bulk", authMiddleware, filterUser);

module.exports = {
  userRouter,
};
