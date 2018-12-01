const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  position: Array
});

const City = mongoose.model('City', citySchema);

module.exports = {
  City
};
