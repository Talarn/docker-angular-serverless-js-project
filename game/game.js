const requestPromise = require('request-promise');

const serverlessUrl = process.env.SERVERLESS_URL;

const vehiclesInitialization = async () => {
  const array = [
    {name: 'Audi', position: [10, 10], destination: [0, 0]},
    {name: 'Citroen', position: [11, 11], destination: [0, 0]},
    {name: 'Volkswagen', position: [12, 12], destination: [0, 0]}
  ];

  await requestPromise({body: array, json: true, method: 'POST', uri: serverlessUrl + 'insertVehicles'});
};

const citiesInitialization = async () => {
  const array = [
    {position: [50, 50]},
    {position: [100, 100]},
    {position: [40, 70]}
  ];

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

const gameInitialization = async () => {
  await vehiclesInitialization();
  await citiesInitialization();
  // rajouter provider
};

const gameLoop = async () => {
  let vehicles = null;
  let cities = null;

  // cities = await retrieveCities();
  vehicles = await retrieveVehicles();
  // console.log(cities);
  console.log(vehicles);

  // vehicles.forEach(vehicle => {
  //   console.log(vehicle);
  // });


  // await requestPromise({ body: { name: 'Audi', destination: [6, 6] }, json: true, method: 'POST', uri: serverlessUrl + 'assignVehicleDestination' }).then(result => console.log(result));
};

setTimeout(gameInitialization, 4000);
setTimeout(gameLoop, 5000);

// gameLoop
// Récupérer le véhicule
// Récupérer les villes (pour l'instant, seulement une seul fois au début de la boucle)
// Envoyer la position du véhicule et des villes au pathfinding
// Calcul du pathfinding (initialiser une destination aléatoire juste avant)  et mise à jour de la position du véhicule
