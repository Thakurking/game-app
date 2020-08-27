const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 6,
    },
    Status: {
        type: String,
        required: true,
    },
    Verification: {
        type: String,
        required: true,
    },
    Profile: {
        type: String,
        default: null,
    },
    Coin: {
        type: String,
        default: null,
    }
})

module.exports = mongoose.model("user", UserSchema);