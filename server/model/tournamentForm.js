const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Tournament = new Schema({
    tournamentName: {
        type: String,
        unique: true,
        required: true,
        default: null,
    },
    tournamentBanner: {
        type: String,
        default: null,
    },
    noOfPlayers: {
        type: String,
        default: null,
    },
    tournamentDescription: {
        type: String,
        default: null,
    },
    tournamentFee: {
        type: String,
        default: null,
    }
})
module.exports = mongoose.model("tournament", Tournament)
