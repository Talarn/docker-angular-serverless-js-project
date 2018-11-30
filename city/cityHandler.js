const City = require('./controllers/city');
const mongoose = require('mongoose');
const dbURL = process.env.DB
mongoose.connect(dbURL);

const insertCitiesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await City.insertCities(JSON.parse(msg.body)))
});

const getCitiesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await City.getCities())
})

module.exports = {
  insertCitiesHandler,
  getCitiesHandler
};