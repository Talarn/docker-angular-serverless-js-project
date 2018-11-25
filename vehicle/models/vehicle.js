const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  name: String,
  x: Number,
  y: Number
  // pathCoordinates:Array
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);


module.exports = {
  Vehicle
};
