
const {Vehicle} = require('../models/vehicle');

const createVehicle = (name, x, y) => {
  Vehicle({name, x, y}).save(); 
}

const updateVehiclePosition = (name, x, y) => {
  console.log('1111111111111111111111111111111111111111111111111111111');
    Vehicle.findOne({name})
    .then(vehicle => {
      console.log('2222222222222222222222222222222222222222222222');
      if (vehicle) {
        vehicle.x = x; 
        vehicle.y = y; 
        console.log('3333333333333333333333333333333333333');
        return vehicle.save();
      }
    })
    .catch(err => console.log(err));
}

const getVehicles = () => {
    return Vehicle.find({});
}

module.exports = {
    createVehicle,
    updateVehiclePosition,
    getVehicles
};
