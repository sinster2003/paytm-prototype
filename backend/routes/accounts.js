const accountRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const { authMiddleware } = require("../middleware");
const { Account } = require("../models/accounts");
const { accountBalance, accountTransfer } = require("../controllers/accounts");

// account requests are handled
accountRouter.get("/balance", authMiddleware, accountBalance);

accountRouter.post("/transfer", authMiddleware, accountTransfer);

module.exports = {
    accountRouter
};