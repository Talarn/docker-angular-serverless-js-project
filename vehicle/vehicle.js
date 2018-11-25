const Vehicle = require('./controllers/vehicle');
const mongoose = require('mongoose');
const dbURL = process.env.DB
mongoose.connect(dbURL);

const createVehicle = ({name, x, y}) => {
    Vehicle.createVehicle(name, x, y);
}

const updateVehicle = (name, newX, newY) => {
    Vehicle.updateVehiclePosition(name, newX, newY);
}

const createVehicleHandler = async msg => ({
    status: 200,
    body: JSON.stringify(createVehicle(JSON.parse(msg.body)))
});

const updateVehicleHandler = async msg => ({
    status: 200,
    body: JSON.stringify(updateVehicle(JSON.parse(msg.body)))
});


module.exports = {
    createVehicleHandler,
    updateVehicleHandler
};