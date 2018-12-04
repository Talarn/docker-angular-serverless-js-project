const {City} = require('../models/city');

const insertCities = arr => {
  City.insertMany(arr);
};

const getCities = () => {
  return City.find({}, {position: 1, _id:0}).exec();
};

module.exports = {
  insertCities,
  getCities
};
