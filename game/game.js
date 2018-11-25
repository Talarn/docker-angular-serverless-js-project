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
    requestPromise({body: {"name": "TESTVEHICULE", "x": 9, "y": 10}, json: true, method: 'POST', uri: 'http://192.168.99.100:3001/createVehicle'})
.then(resultat => console.log(resultat)); //Faire les calculs ici
};

// setTimeout(initDB, 10000);
setTimeout(test, 8000);

// Boucle de jeu
// Récupérer les véhicules
// Récupérer les villes
// Pour chaque véhicule, envoyer la position des villes et du véhicule au pathfinding (si il n'a pas déjà un chemin)
// Récupérer la liste des positions renvoyés par le pathfinding des villes à suivre
// Assigner la liste à chaque vehicle
// Calculer la nouvelle position en fonction du pathfinding
