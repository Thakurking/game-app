const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Phone: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        maxlength: 6,
        default: null,
    },
    Role: {
        type: String,
        required: true,
        default: "admin",
    },
    Profile: {
        type: String,
        default: null,
    },
    Name: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model("admin", AdminSchema)