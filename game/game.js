const requestPromise = require('request-promise');

const serverlessUrl = process.env.SERVERLESS_URL;

getRandomInt = maxValue => {
  return Math.floor(Math.random() * Math.floor(maxValue));
};

const vehiclesInitialization = async () => {
  const array = [
    {name: 'Toyota', position: [0, 0], destination: [0, 0], path: []},
    {name: 'Jeep', position: [0, 0], destination: [0, 0], path: []},
    {name: 'BMW', position: [0, 0], destination: [0, 0], path: []},
    {name: 'Volvo', position: [0, 0], destination: [0, 0], path: []},
    {name: 'Audi', position: [0, 0], destination: [0, 0], path: []},
    {name: 'Ford', position: [0, 0], destination: [0, 0], path: []}
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
    // let randomCityPosition = cities[Math.floor(Math.random() * Math.floor(cities.length))].position;
    // await updateVehiclePosition(vehicles[i].name, randomCityPosition);

    let randomCityPosition = cities[Math.floor(Math.random() * Math.floor(cities.length))].position;
    await assignVehicleDestination(vehicles[i].name, randomCityPosition);
  }
};

const getUnitVector = (a, b) => {
  const vector = [a[0] - b[0], a[1] - b[1]];
  const vectorLength = Math.floor(Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1])));
  vector[0] /= vectorLength;
  vector[1] /= vectorLength;
  vector[0] = Math.ceil(vector[0] * 2);
  vector[1] = Math.ceil(vector[1]* 2);
  return vector;
};

const isNear = (vehiclePosition, cityPosition) => {
  const vector = [vehiclePosition[0] - cityPosition[0], vehiclePosition[1] - cityPosition[1]];
  const vectorLength = Math.floor(Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1])));
  return (vectorLength < 2 ? true : false);
};

const updateVehiclePath = async (name, path) => {
  await requestPromise({body: {name: name, path: path}, json: true, method: 'POST', uri: serverlessUrl + 'removeCityFromPath'});
};

const moveVehicles = async (vehicles) => {
  for (let i = 0; i < vehicles.length; i++){
    let vehicle = vehicles[i];
    let nextCityPosition = vehicle.path[0];
    let unitVector = getUnitVector(vehicle.position, nextCityPosition);
    let newX = vehicle.position[0] + unitVector[0];
    let newY = vehicle.position[1] + unitVector[1];
    await updateVehiclePosition(vehicle.name, [newX, newY]);
};

const pathFinding = async (vehicle, cities) => {
  let path = null;
  await requestPromise({body: {vehicle: vehicle, cities: cities}, json: true, method: 'POST', uri: serverlessUrl + 'pathfinding'}).then(body => path = body);
  await requestPromise({body: {name: vehicle.name, path: path }, json: true, method: 'POST', uri: serverlessUrl + 'assignVehiclePath'});
};

const vehiclesPathFinding = async (vehicles, cities) => {
  for (let i = 0; i < vehicles.length; i++) {
    if(vehicles[i].path.length == 0)
      await pathFinding(vehicles[i], cities);
  }
};
//trouver un autre nom pour la fonction
const providerSupplying = async (vehicles)=> {
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    let nextCityPosition = vehicle.path[0];
    if (isNear(vehicle.position, nextCityPosition)) {

    }
  }
//regarder si le véhicule est proche d'une ville,
  // si oui faire une demande de ?????
  // enlever la ville du path
  //si c'était la dernière ville, choisir une nouvelle destination ou
  // retirer le véhicule
};

const gameInitialization = async () => {
  let cities, vehicles;

  await vehiclesInitialization();
  await citiesInitialization(5);

  vehicles = await retrieveVehicles();
  cities = await retrieveCities();
  await vehiclesPositionInitialisation(vehicles, cities);
};

const gameLoop = async () => {
  let vehicles;
  let cities;

  vehicles = await retrieveVehicles();
  cities = await retrieveCities();
  // console.log(vehicles);
  // console.log(cities);
  await vehiclesPathFinding(vehicles, cities);
  vehicles = await retrieveVehicles();
  await moveVehicles(vehicles);
  await providerSupplying(vehicles);

};

setTimeout(gameInitialization, 8000);
setTimeout(() => {setInterval(gameLoop,2000)}, 12000);
