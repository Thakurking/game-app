const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tournament = new Schema({
  tournamentName: {
    type: String,
    required: true,
    default: null,
  },
  banner: {
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
  },
  teamType: {
    type: String,
    default: null,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});
module.exports = mongoose.model("tournament", Tournament);
