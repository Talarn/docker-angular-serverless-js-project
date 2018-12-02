const mongoose = require('mongoose');
const Vehicle = require('./controllers/vehicle');

const dbURL = process.env.DB;
mongoose.connect(dbURL);

const insertVehiclesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.insertVehicles(JSON.parse(msg.body)))
});

const updateVehiclePositionHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.updateVehiclePosition(JSON.parse(msg.body)))
});

const assignVehicleDestinationHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.assignVehicleDestination(JSON.parse(msg.body)))
});

const getVehiclesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.getVehicles(JSON.parse(msg.body)))
});

module.exports = {
  insertVehiclesHandler,
  updateVehiclePositionHandler,
  getVehiclesHandler,
  assignVehicleDestinationHandler
};
