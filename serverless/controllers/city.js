const {City} = require('../models/city');

const insertCities = arr => {
  City.insertMany(arr);
};

const getCities = () => {
  return City.find({}, {position: 1, _id: 0}).exec();
};

const dropCityCollection = async () => {
  await City.remove({}, err => {
  });
};

module.exports = {
  insertCities,
  getCities,
  dropCityCollection
};
