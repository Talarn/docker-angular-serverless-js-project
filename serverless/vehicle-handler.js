const mongoose = require('mongoose');
const Vehicle = require('./controllers/vehicle');

const dbURL = process.env.DB;
mongoose.connect(dbURL);

const insertVehiclesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.insertVehicles(JSON.parse(msg.body)))
});

const updateVehicleSpeedHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.updateVehicleSpeed(JSON.parse(msg.body)))
});

const updateVehiclePositionHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.updateVehiclePosition(
    JSON.parse(msg.body)))
});

const updateVehiclePathHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.updateVehiclePath(
    JSON.parse(msg.body)))
});

const updateVehicleDestinationHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.updateVehicleDestination(
    JSON.parse(msg.body)))
});

const getVehiclesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.getVehicles(JSON.parse(msg.body)))
});

const dropVehicleCollectionHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.dropVehicleCollection(
    JSON.parse(msg.body)))
});

module.exports = {
  insertVehiclesHandler,
  updateVehiclePositionHandler,
  getVehiclesHandler,
  updateVehicleDestinationHandler,
  updateVehiclePathHandler,
  updateVehicleSpeedHandler,
  dropVehicleCollectionHandler
};
