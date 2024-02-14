const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

const connectDb = async () => {
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGO_URI);
        console.log(`MongoDb connected at ${mongoose.connection.host}`);
    }
    catch(error) {
        console.log(error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

module.exports = connectDb;