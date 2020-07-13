if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { getSummonerDataBetween } = require('./src/league');
const { updateGames, getLast } = require('./src/sheet');
const argv = require('yargs').argv;
(async () => {
  try {
    const summonerName =
      argv.summoner == undefined ? process.env.LEAGUE_SUMMONER_NAME : argv.summoner;

    const { datetime: lastDatetime, duration } = await getLast(summonerName);
    updateGames(
      await getSummonerDataBetween(
        summonerName,
        lastDatetime.add(duration - 0.2, 'minutes').format('x'),
      ),
      summonerName,
    );
  } catch (err) {
    console.error(err);
    if (err.statusCode === 404) process.exit(0);
    process.exit(1);
  }
})();
