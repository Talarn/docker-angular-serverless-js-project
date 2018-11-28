const test = require('./controllers/vehicle');
const mongoose = require('mongoose');
const dbURL = process.env.DB
mongoose.connect(dbURL);

const getVehicles = ({}) => {
    return test.getVehicles();
}

const createVehicle = ({name, x, y}) => {
    test.createVehicle(name, x, y);
}

const updateVehicle = (name, x, y) => {
    test.updateVehiclePosition(name, x, y);
}

const createVehicleHandler = async msg => ({
    status: 200,
    body: JSON.stringify(createVehicle(JSON.parse(msg.body)))
});

const updateVehicleHandler = async msg => ({
    status: 200,
    body: JSON.stringify(updateVehicle(JSON.parse(msg.body)))
});

const getVehiclesHandler = async msg => ({
    status: 200,
    body: JSON.stringify(getVehicles(JSON.parse(msg.body)))
})


module.exports = {
    createVehicleHandler,
    updateVehicleHandler,
    getVehiclesHandler
};