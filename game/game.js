const requestPromise = require('request-promise');

const serverlessUrl = process.env.SERVERLESS_URL;

getRandomInt = maxValue => {
  return Math.floor(Math.random() * Math.floor(maxValue));
};

const vehiclesInitialization = async () => {
  const array = [
    {name: 'Toyota', position: [0, 0], destination: [0, 0]},
    {name: 'Jeep', position: [0, 0], destination: [0, 0]},
    {name: 'BMW', position: [0, 0], destination: [0, 0]},
    {name: 'Volvo', position: [0, 0], destination: [0, 0]},
    {name: 'Audi', position: [0, 0], destination: [0, 0]},
    {name: 'Ford', position: [0, 0], destination: [0, 0]}
    // {name: 'Honda', position: [0, 0], destination: [0, 0]},
    // {name: 'Kia', position: [0, 0], destination: [0, 0]},
    // {name: 'Mazda', position: [0, 0], destination: [0, 0]}
  ];

  await requestPromise({body: array, json: true, method: 'POST', uri: serverlessUrl + 'insertVehicles'});
};

const citiesInitialization = async (amount) => {
  let array = [];

  for (let i = 0; i < amount; i++){
    array.push({position: [getRandomInt(100), getRandomInt(100)]});
  }

  await requestPromise({body: array, json: true, method: 'POST', uri: serverlessUrl + 'insertCities'});
};

const retrieveCities = async () => {
  let cities = null;
  await requestPromise({body: {}, json: true, method: 'GET', uri: serverlessUrl + 'getCities'}).then(body => cities = body);
  return cities;
};

const retrieveVehicles = async () => {
  let vehicles = null;
  await requestPromise({body: {}, json: true, method: 'GET', uri: serverlessUrl + 'getVehicles'}).then(body => vehicles = body);
  return vehicles;
};

const updateVehiclePosition = async (name, position) => {
  await requestPromise({body: {name: name, position: position }, json: true, method: 'POST', uri: serverlessUrl + 'updateVehiclePosition'});
};

const assignVehicleDestination = async (name, destination) => {
  await requestPromise({body: {name: name, destination: destination }, json: true, method: 'POST', uri: serverlessUrl + 'assignVehicleDestination'});
};



const vehiclesPositionInitialisation =  async (vehicles, cities) =>{
  for (let i = 0; i < vehicles.length; i++) {
    let randomCityPosition = cities[Math.floor(Math.random() * Math.floor(cities.length))].position;
    await updateVehiclePosition(vehicles[i].name, randomCityPosition);

    randomCityPosition = cities[Math.floor(Math.random() * Math.floor(cities.length))].position;
    await assignVehicleDestination(vehicles[i].name, randomCityPosition);
  }
};


const pathfindingCalculation = async (vehicle, cities) => {
  let result = null;
  await requestPromise({body: {vehicle: vehicle}, json: true, method: 'POST', uri: serverlessUrl + 'pathfinding'});
  // .then(body => result = body);
  console.log(result);
//  renvoyer une requete pour mettre à jour la position du vehicule
};

const vehiclesPathfindingCalculation = async (vehicles, cities) => {
  for (let i = 0; i < vehicles.length; i++) {
    await pathfindingCalculation(vehicles[i], cities);
  }
};

const gameInitialization = async () => {
  let cities, vehicles;

  await vehiclesInitialization();
  await citiesInitialization(5);

  cities = await retrieveCities();
  vehicles = await retrieveVehicles();
  await vehiclesPositionInitialisation(vehicles, cities);
};

const gameLoop = async () => {
  let vehicles;
  let cities;

  vehicles = await retrieveVehicles();
  cities = await retrieveCities();
  console.log(vehicles);
  console.log(cities);
  await vehiclesPathfindingCalculation(vehicles, cities);

};

setTimeout(gameInitialization, 6000);
setTimeout(gameLoop, 10000);
