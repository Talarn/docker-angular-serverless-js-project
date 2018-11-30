const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema({
  position: Array
});

const City = mongoose.model('City', citySchema);

module.exports = {
  City
};
