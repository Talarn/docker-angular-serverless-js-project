const {Vehicle} = require('../models/vehicle');

const insertVehicles = async arr => {
  await Vehicle.insertMany(arr);
};

const updateVehiclePosition = async ({name, position}) => {
  console.log("Vehicle", name, "new position :", position);
  await Vehicle.findOneAndUpdate({name}, {position}).exec();
};

const assignVehicleDestination = async ({name, destination}) => {
  console.log("Vehicle", name, "new destination :", destination);
  await Vehicle.findOneAndUpdate({name}, {destination}).exec();
};

const getVehicles = () => {
  return Vehicle.find({}, {name: 1, position: 1, destination: 1, _id: 0}).exec();
};

module.exports = {
  insertVehicles,
  updateVehiclePosition,
  getVehicles,
  assignVehicleDestination
};
