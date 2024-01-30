const { default: mongoose } = require("mongoose");
const { Account } = require("../models/accounts");

const accountBalance = async (req,res) => {
    const userId = req.userId;
    try{
        const account = await Account.findOne({userId});

        if(!account) {
            return res.status(404).json({message: "Account not found"});
        }

        res.status(200).json({balance: account.balance});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const accountTransfer = async (req,res) => {
    const session = await mongoose.startSession(); // start the session
    session.startTransaction(); // start the transaction

    const {to, amount} = req.body;

    try {
        const from = await Account.findOne({
            userId: req.userId
        }).session(session); // operation has to be associated to a session
        
        if(!from) {
            await session.abortTransaction();
            res.status(400).json({
                message: "Account not found. Please sign up"
            });
        }

        const isValidToAccount = await Account.findOne({
            userId: to
        }).session(session);

        if(!isValidToAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // balance < amount ---> error
        if(from.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
        
        // updating the debit (decrementing) atomic operation
        await Account.findByIdAndUpdate(from._id, {
            $inc: {balance: -amount}
        }, {session});
    
        // updating the credit (incrementing) atomic operation
        await Account.findByIdAndUpdate(isValidToAccount._id, {
            $inc: {balance: amount}
        }, {session});

        // committing transaction
        await session.commitTransaction();
        return res.status(200).json({
            message: "Transfer Successful"
        });
    }
    catch(error) {
        // aborting transaction
        await session.abortTransaction();
        res.status(500).json({
            message: "Something went wrong"
        });
    }
    finally {
        session.endSession();
    }
}

module.exports = {
    accountBalance,
    accountTransfer
}