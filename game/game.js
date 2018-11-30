const requestPromise = require('request-promise');

const vehiclesInitialization = () => {
  let array = [
    { name: 'Audi', position: [10, 10], destination: [0, 0] },
    { name: 'Citroen', position: [11, 11], destination: [0, 0] },
    { name: 'Volkswagen', position: [12, 12], destination: [0, 0] }
  ];

  requestPromise({ body: array, json: true, method: 'POST', uri: 'http://192.168.99.100:3001/insertVehicles' })
    .then(resultat => console.log(resultat));

};

const citiesInitialization = () => {
  let array = [
    { position: [50, 50] },
    { position: [100, 100] },
    { position: [40, 70] }
  ];

  requestPromise({ body: array, json: true, method: 'POST', uri: 'http://192.168.99.100:3000/insertCities' })
    .then(resultat => console.log(resultat));
}

const test = () => {

  // requestPromise({body: {}, json: true, method: 'GET', uri: 'http://192.168.99.100:3001/getVehicles'}).then(resultat => console.log(resultat));

  requestPromise({ body: { name: 'Audi', destination: [6, 6] }, json: true, method: 'POST', uri: 'http://192.168.99.100:3001/assignVehicleDestination' }).then(resultat => console.log(resultat));
};

// setTimeout(vehiclesInitialization, 6000);
setTimeout(citiesInitialization, 6000);
// setTimeout(test, 6000);

// Boucle de jeu
// Récupérer le véhicule
// Récupérer les villes
// Envoyer la position du véhicule et des villes au pathfinding
// Calcule du pathfinding (initialiser une destination aléatoire) et mise à jour de la position d'un       véhicule
