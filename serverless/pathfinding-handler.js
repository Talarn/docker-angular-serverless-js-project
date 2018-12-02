const shortestPath = (vehicle) => {
  console.log("PATHFINDING");
  return "PATHFINDING"
  // console.log("PATHFINDING", vehicle);
  // const vehiclePosition = vehicle.position;
  // const vehicleDestination = vehicle.destination;
  // const vector = [vehicleDestination[0] - vehiclePosition[0], vehicleDestination[1]- vehiclePosition[1]];
  // const vectorLength = Math.floor(Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1])));
  // vector[0] /= vectorLength;
  // vector[1] /= vectorLength;
  // return vehicle;
};

const shortestPathHandler = msg => ({
  status: 200,
  body: JSON.stringify(shortestPath(JSON.parse(msg.body)))
});

module.exports = {
  shortestPathHandler
};
