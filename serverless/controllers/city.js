const {City} = require('../models/city');

const insertCities = arr => {
  City.insertMany(arr);
};

const getCities = () => {
  return City.find({}, {position: 1}).exec();
};

module.exports = {
  insertCities,
  getCities
};
