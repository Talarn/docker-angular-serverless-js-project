const requestPromise = require('request-promise');

const serverlessUrl = process.env.SERVERLESS_URL;
//Modifier les fonctions avec un request à la fin
getRandomInt = maxValue => {
  return Math.floor(Math.random() * Math.floor(maxValue));
};

const getSpeedBoost = async () => {
  let speedBoost = null;
  await requestPromise({body: {}, json: true, method: 'GET', uri: serverlessUrl + 'provideBoost'}).then(body => speedBoost = body);
  return speedBoost;
};

const vehiclesInitialization = async () => {
  //Rajouter une vitesse au véhicule
  const array = [
    {name: 'Toyota', position: [0, 0], destination: [0, 0], speed: 1, path: []}
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

const updateVehicleDestination = async (name, destination) => {
  await requestPromise({body: {name: name, destination: destination }, json: true, method: 'POST', uri: serverlessUrl + 'updateVehicleDestination'});
};

const updateVehiclePath = async (name, path) => {
  await requestPromise({body: {name: name, path: path }, json: true, method: 'POST', uri: serverlessUrl + 'updateVehiclePath'});
};
const updateVehicleSpeed = async (name, speed) => {
  await requestPromise({body: {name: name, speed: speed }, json: true, method: 'POST', uri: serverlessUrl + 'updateVehicleSpeed'});
};

const vehiclesPositionInitialisation =  async (vehicles, cities) =>{
  for (let i = 0; i < vehicles.length; i++) {
    let randomCityPosition = cities[Math.floor(Math.random() * Math.floor(cities.length))].position;
    await updateVehiclePosition(vehicles[i].name, randomCityPosition);
    await updateVehicleDestination(vehicles[i].name, randomCityPosition);
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
  const vector = [cityPosition[0] - vehiclePosition[0], cityPosition[1] - vehiclePosition[1]];
  const vectorLength = Math.floor(Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1])));
  return (vectorLength < 2 ? true : false);
};

const moveVehicles = async (vehicles) => {
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    let nextCityPosition = vehicle.path[0];
    let unitVector = getUnitVector(vehicle.position, nextCityPosition);
    let newX = vehicle.position[0] + unitVector[0];
    let newY = vehicle.position[1] + unitVector[1];
    await updateVehiclePosition(vehicle.name, [newX, newY]);
  }
};

const pathFinding = async (vehicle, cities) => {
  let path = null;
  await requestPromise({body: {vehicle: vehicle, cities: cities}, json: true, method: 'POST', uri: serverlessUrl + 'pathfinding'}).then(body => path = body);
  await updateVehiclePath(vehicle.name, path);
};


const vehiclesPathFinding = async (vehicles, cities) => {
  for (let i = 0; i < vehicles.length; i++) {
    if(vehicles[i].path.length === 0)
      await pathFinding(vehicles[i], cities);
  }
};

const checkTownProximity = async (vehicles)=> {
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    let nextCityPosition = vehicle.path[0];
    if (isNear(vehicle.position, nextCityPosition)) {
      let speedBoost = await getSpeedBoost();
      await updateVehicleSpeed(vehicle.name, speedBoost).
      vehicle.path.shift();
      await updateVehiclePath(vehicle.name, vehicle.path);
    }

    if (vehicle.path.length === 0){
        await gameInitialization();
    }
  }

};

// Penser à vider la base mongo juste avant
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
  await vehiclesPathFinding(vehicles, cities);
  vehicles = await retrieveVehicles();
  await moveVehicles(vehicles);
  await checkTownProximity(vehicles);

};

setTimeout(gameInitialization, 8000);
setTimeout(() => {setInterval(gameLoop,2000)}, 12000);
