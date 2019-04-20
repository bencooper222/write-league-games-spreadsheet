if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { getSummonerDataSince } = require('./src/league');
const { updateGames } = require('./src/updateSheet');

(async () => {
  const numDays = 14;
  const gameData = await getSummonerDataSince(Date.now() - numDays * 8.64e7); //
  updateGames(gameData);
})();
