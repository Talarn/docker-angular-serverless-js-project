const requestPromise = require('request-promise');

const serverlessUrl = process.env.SERVERLESS_URL;

getRandomInt = maxValue => {
  return Math.floor(Math.random() * Math.floor(maxValue));
};

const vehiclesInitialization = () => {
  const array = [
    {name: 'Toyota', position: [0, 0], destination: [0, 0]},
    {name: 'Jeep', position: [0, 0], destination: [0, 0]},
    {name: 'BMW', position: [0, 0], destination: [0, 0]},
    {name: 'Volvo', position: [0, 0], destination: [0, 0]},
    {name: 'Audi', position: [0, 0], destination: [0, 0]},
    {name: 'Ford', position: [0, 0], destination: [0, 0]},
    {name: 'Honda', position: [0, 0], destination: [0, 0]},
    {name: 'Kia', position: [0, 0], destination: [0, 0]},
    {name: 'Mazda', position: [0, 0], destination: [0, 0]}
  ];

  requestPromise({body: array, json: true, method: 'POST', uri: serverlessUrl + 'insertVehicles'});
};

const citiesInitialization = (amount) => {
  let array = [];

  for (let i = 0; i < amount; i++){
    array.push({position: [getRandomInt(100), getRandomInt(100)]});
  }

  requestPromise({body: array, json: true, method: 'POST', uri: serverlessUrl + 'insertCities'});
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

const gameInitialization =  () => {
   vehiclesInitialization();
   citiesInitialization(5);
  // rajouter provider
};

const gameLoop = async () => {
  let vehicles;
  let cities;

  cities = await retrieveCities();
  vehicles = await retrieveVehicles();

  console.log(cities);
  console.log(vehicles);

  vehicles.forEach(vehicle => {
    let randomCityPosition = cities[Math.floor(Math.random() * Math.floor(cities.length))].position;
    requestPromise({body: {name: vehicle.name, position: randomCityPosition }, json: true, method: 'POST', uri: serverlessUrl + 'updateVehicle'});

    //Faire en sorte que la ville choisie ne soit pas la même
    randomCityPosition = cities[Math.floor(Math.random() * Math.floor(cities.length))].position;
    requestPromise({body: {name: vehicle.name, destination: randomCityPosition }, json: true, method: 'POST', uri: serverlessUrl + 'assignVehicleDestination'});

  });

  vehicles = await retrieveVehicles();
  vehicles.forEach(vehicle => {
      let result = requestPromise({body: {vehicle: vehicle}, json: true, method: 'GET', uri: serverlessUrl + 'pathfinding'});
      console.log("VECTEUR UNITAIRE", result);
  });


  console.log("VEHICLE POSITION INITIALIZED TO A RANDOM CITY");
  console.log(vehicles);



};

setTimeout(gameInitialization, 4000);
setTimeout(gameLoop, 5000);

// gameLoop
// Récupérer le véhicule
// Récupérer les villes (pour l'instant, seulement une seul fois au début de la boucle)
// Envoyer la position du véhicule et des villes au pathfinding
// Calcul du pathfinding (initialiser une destination aléatoire juste avant)  et mise à jour de la position du véhicule
