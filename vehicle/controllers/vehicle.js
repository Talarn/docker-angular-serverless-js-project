const {Vehicle} = require('../models/vehicle');

const createVehicle = (name, x, y) => {
  Vehicle({name, x, y}).save(); 
}

const updateVehiclePosition = (name, x, y) => {
    Vehicle.findOne({name})
    .then(vehicle => {
      if (vehicle) {
        vehicle.x = 0; //calculer la nouvelle position
        vehicle.y = 0; //calculer la nouvelle position
        return vehicle.save();
      }
    })
    .catch(err => console.log(err));
}

const getVehicles = () => {
    return Vehicle.find({});

module.exports = {
    createVehicle,
    updateVehiclePosition,
    getVehicles
};
