const provideBoost = () => {
  return Math.floor(Math.random() * (5 - 4 + 1)) + 4;
};

const provideBoostHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await provideBoost(JSON.parse(msg.body)))
});

module.exports = {
  provideBoostHandler
};
