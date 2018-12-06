const provideBoost = () => {
//  retourner une valeur au pif pour le boost de vitesse
  return 2;
};

const provideBoostHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await provideBoost(JSON.parse(msg.body)))
});


module.exports = {
  provideBoostHandler
};
