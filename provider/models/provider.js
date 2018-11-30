const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const providerSchema = new Schema({
  test: Number
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = {
  Provider
};
