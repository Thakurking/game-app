const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentRegistration = new Schema({
  tournament_id: {
      type: String,
      required: true,
  },
  player_name: [{
      
  }]
})