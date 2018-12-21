const {Vehicle} = require('../models/vehicle');

const insertVehicles = async arr => {
  await Vehicle.insertMany(arr);
};

const updateVehiclePosition = async ({name, position}) => {
  await Vehicle.findOneAndUpdate({name}, {position}).exec();
};

const updateVehicleSpeed = async ({name, speed}) => {
  await Vehicle.findOneAndUpdate({name}, {speed}).exec();
};

const updateVehicleDestination = async ({name, destination}) => {
  await Vehicle.findOneAndUpdate({name}, {destination}).exec();
};

const updateVehiclePath = async ({name, path}) => {
  await Vehicle.findOneAndUpdate({name}, {path}).exec();
};

const getVehicles = () => {
  return Vehicle.find({}, {name: 1, position: 1, destination: 1, _id: 0,
    path: 1, speed: 1}).exec();
};

const dropVehicleCollection = async () => {
  await Vehicle.remove({});
};

module.exports = {
  insertVehicles,
  updateVehiclePosition,
  getVehicles,
  updateVehicleDestination,
  updateVehiclePath,
  updateVehicleSpeed,
  dropVehicleCollection
};
