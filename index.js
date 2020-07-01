if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { getSummonerDataBetween } = require('./src/league');
const { updateGames, getLast } = require('./src/sheet');
const argv = require('yargs').argv;
(async () => {
  try {
    const summonerName =
      argv.summoner == undefined ? process.env.LEAGUE_SUMMONER_NAME : argv.summoner;
    updateGames(
      await getSummonerDataBetween(
        summonerName,
        (await getLast(summonerName)).add(1, 'hours').format('x'),
      ),
      summonerName,
    );
  } catch (err) {
    console.error(err);
    if (err.statusCode === 404) process.exit(0);
    process.exit(1);
  }
})();
