const { default: mongoose } = require("mongoose");
const { Account } = require("./models/accounts");
const connectDb = require("./db");

async function transfer(req) {
    await connectDb();
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;

        // Fetch the accounts within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            console.log("Insufficient balance");
            return;
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            console.log("Invalid account");
            return;
        }

        // Perform the transfer
        await Account.findByIdAndUpdate(account._id, { $inc: { balance: -amount } }, { session });
        await Account.findByIdAndUpdate(toAccount._id, { $inc: { balance: amount } }, { session });

        // Commit the transaction
        await session.commitTransaction();
        console.log("Transfer successful");
    } 
    catch (error) {
        console.error(error);
        await session.abortTransaction();
        console.log("Transfer aborted");
    } 
    finally {
        if (session.inTransaction()) {
            await session.abortTransaction(); // Ensuring the transaction is aborted in case of an unexpected issue
        }
        session.endSession();
    }
}

// Example usage
transfer({
    userId: "65b379fa829943b62e87f8bd",
    body: {
        to: "65b3799e829943b62e87f8b8",
        amount: 1000
    }
});

transfer({
    userId: "65bfc9e7dc8fdc021c9736b4",
    body: {
        to: "65b3799e829943b62e87f8b8",
        amount: 1000
    }
});