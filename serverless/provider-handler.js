const provideBoost = () => {
  return Math.floor(Math.random() * (7 - 4 + 1) ) + 4;
};

const provideBoostHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await provideBoost(JSON.parse(msg.body)))
});

module.exports = {
  provideBoostHandler
};
