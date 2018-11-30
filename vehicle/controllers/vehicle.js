const { Vehicle } = require('../models/vehicle');

const insertVehicles = (arr) => {
  return Vehicle.insertMany(arr);
}

const updateVehiclePosition = async ({name, position}) => {
  Vehicle.findOneAndUpdate({name}, { position }).exec();
}

const assignVehicleDestination = async ({name, destination}) => {
  Vehicle.findOneAndUpdate({name}, { destination }).exec();
}

const getVehicles = async  () => {
  return Vehicle.find({}).exec(); //Renvoyer uniquement le nom, position et destination
}

module.exports = {
  insertVehicles,
  updateVehiclePosition,
  getVehicles,
  assignVehicleDestination
};
