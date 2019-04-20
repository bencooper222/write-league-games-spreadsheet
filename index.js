if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { getSummonerDataSince } = require('./src/league');
const { updateGames, getLast } = require('./src/sheet');

(async () => {
  try {
    updateGames(
      await getSummonerDataSince((await getLast()).add(1, 'hours').format('x')),
    );
  } catch (err) {
    console.error('No games');
  }
})();
