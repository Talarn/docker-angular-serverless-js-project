const mongoose = require('mongoose');
const City = require('./controllers/city');

const dbURL = process.env.DB;
mongoose.connect(dbURL);

const insertCitiesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await City.insertCities(JSON.parse(msg.body)))
});

const getCitiesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await City.getCities(JSON.parse(msg.body)))
});

module.exports = {
  insertCitiesHandler,
  getCitiesHandler
};
