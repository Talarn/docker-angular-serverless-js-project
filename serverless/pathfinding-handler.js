const pathfinding = ({cities}) => {
  const path = [];
  cities.forEach(city => {
    path.push(city.position);
  });
  return path;
};

const pathfindingHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await pathfinding(JSON.parse(msg.body)))
});

module.exports = {
  pathfindingHandler
};
