const shortestPath = ({vehicle}) => {
  const vehiclePosition = vehicle.position;
  const vehicleDestination = vehicle.destination;
  const vector = [vehicleDestination[0] - vehiclePosition[0], vehicleDestination[1]- vehiclePosition[1]];
  const vectorLength = Math.floor(Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1])));
  vector[0] /= vectorLength;
  vector[1] /= vectorLength;
  vector[0] = Math.ceil(vector[0] * 2);
  vector[1] = Math.ceil(vector[1]* 2);
  return vector;
};

const shortestPathHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await shortestPath(JSON.parse(msg.body)))
});

module.exports = {
  shortestPathHandler
};
