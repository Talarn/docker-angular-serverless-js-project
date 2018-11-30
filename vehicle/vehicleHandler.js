const Vehicle = require('./controllers/vehicle');
const mongoose = require('mongoose');
const dbURL = process.env.DB
mongoose.connect(dbURL);

const insertVehiclesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.insertVehicles(JSON.parse(msg.body)))
});

const updateVehicleHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.updateVehiclePosition(JSON.parse(msg.body)))
});

const assignVehicleDestinationHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.assignVehicleDestination(JSON.parse(msg.body)))
});

const getVehiclesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await Vehicle.getVehicles())
})

module.exports = {
  insertVehiclesHandler,
  updateVehicleHandler,
  getVehiclesHandler,
  assignVehicleDestinationHandler
};