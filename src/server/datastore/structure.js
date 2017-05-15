var mongoose = require("mongoose");

var structureSchema = mongoose.Schema({
    id : String, 
  	sequence : String,
  	dotNotation : String,
  	colorA : String,
  	colorG : String,
  	colorC : String,
  	colorT : String,
  	baseSize : Number,
  	linkWidth : Number,
  	bondWidth : Number,
});

module.exports = mongoose.model("structure", structureSchema);