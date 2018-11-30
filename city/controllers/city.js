const {City} = require('../models/city');

const insertCities = (arr) => {
  return City.insertMany(arr);
}

const getCities = () => {
  return City.find({});
}

module.exports = {
  insertCities,
  getCities
};
