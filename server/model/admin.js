const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  Email: {
    type: String,
    unique: true,
  },
  Phone: {
    type: String,
    unique: true,
  },
  Password: {
    type: String,
    default: null,
  },
  Role: {
    type: String,
    required: true,
    default: "SuperAdmin",
  },
  Profile: {
    type: String,
    default: null,
  },
  Name: {
    type: String,
    required: true,
    default: "SuperAdmin",
  },
  Status: {
    type: String,
    required: true,
    default: null,
  },
});
module.exports = mongoose.model("admin", AdminSchema);
