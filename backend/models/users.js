const mongoose = require("mongoose");

// schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (input) => {
                return /\S+\@+\S+\.+\S{2}/g.test(input);
            }
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 2,
        maxLength: 50,
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
}, 
{
    timestamps: true
});

// model
const User = mongoose.model("User", userSchema);

module.exports = {
    User
}