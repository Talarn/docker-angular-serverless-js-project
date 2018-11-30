const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  name: String,
  position: Array,
  destination: Array
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = {
  Vehicle
};
