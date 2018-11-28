// const app = require('express')()
// const mongoose = require('mongoose');
const requestPromise = require('request-promise');
// const Vehicle = require('./app/controllers/vehicle');
// const dbURL = process.env.DB;

// const initDB = () => {
//     mongoose.connect(dbURL);
//     Vehicle.createVehicle("a", 1, 1);
//     Vehicle.createVehicle("b", 2, 1);
//     Vehicle.createVehicle("c", 2, 1);
// };

const test = () => {
//     requestPromise({body: {}, json: true, method: 'POST', uri: 'http://192.168.99.100:3001/getVehicle'})
// .then(resultat => console.log(resultat));

//     requestPromise({body: {"name": "AAAAAAAA", "x": 9, "y": 10}, json: true, method: 'POST', uri: 'http://192.168.99.100:3001/createVehicle'})
// .then(resultat => console.log(resultat));

    requestPromise({body: {"name": "AAAAAAAA", "x": 2, "y": 2}, json: true, method: 'POST', uri: 'http://192.168.99.100:3001/updateVehicle'})
.then(resultat => console.log(resultat));
};

// setTimeout(initDB, 10000);
setTimeout(test, 8000);

// Boucle de jeu
// Récupérer le véhicule
// Récupérer les villes
// Pour chaque véhicule, envoyer la position des villes et du véhicule au pathfinding (si il n'a pas déjà un chemin)
// Récupérer la liste des positions renvoyés par le pathfinding des villes à suivre
// Assigner la liste à chaque vehicle
// Calculer la nouvelle position en fonction du pathfinding
