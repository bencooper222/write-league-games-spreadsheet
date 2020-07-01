require('dotenv').config();
const sheetApi = require('../src/sheet');
const fs = require('fs');

const { champMap } = require('../src/constants');
const sortedChamps = Object.values(champMap).sort((a, b) => a.localeCompare(b));

const nextChampMap = sortedChamps.reduce((acc, el, idx) => {
  acc[el] = sortedChamps[idx + 1];
  return acc;
}, {});
console.log(nextChampMap);
const skyfall3665Start = ['05/26/2020 22:27:54', 126];
const avol9Start = ['05/08/2020 21:59:21', 2];

const filterGames = games => {
  const onlyReal = games
    .filter(
      ([queue]) =>
        queue === '5v5 Ranked Solo games' ||
        queue === '5v5 Draft Pick games' ||
        queue === '5v5 Ranked Flex games',
    )
    .map(el => {
      el[3] = el[3] === 'TRUE';
      return el;
    });

  const rtn = [onlyReal[0]];
  for (let i = 1; i < onlyReal.length; i++) {
    const last = rtn[rtn.length - 1];
    // last was a win
    if (last[3]) {
      const seeking = nextChampMap[last[4]];
      if (onlyReal[i][4] === seeking) rtn.push(onlyReal[i]);
      else console.log('No ', onlyReal[i][4], ' not correct next');
    }
    // last was a loss
    else {
      if (last[4] === onlyReal[i][4]) rtn.push(onlyReal[i]);
      else console.log('No ', onlyReal[i][4], ' not correct same');
    }
  }

  return rtn;
};

const createDataset = filteredGames => {
  const rtn = [];

  let countChamps = 0;
  for (let i = 0; i < filteredGames.length; i++) {
    const game = filteredGames[i];
    if (game[3]) {
      countChamps++;
      rtn.push({
        x: i + 1,
        y: countChamps,

        champ: game[4],
      });
    }
  }

  return rtn;
};

(async () => {
  const skyfallGames = await sheetApi.getChallengeInfo('skyfall3665', skyfall3665Start[1]);
  const skyfall3665 = createDataset(filterGames(skyfallGames));

  const avolGames = await sheetApi.getChallengeInfo('avol9', avol9Start[1]);
  const avol9 = createDataset(filterGames(avolGames));

  const json = { avol9, skyfall3665 };

  fs.writeFileSync('./challenge/trend.json', JSON.stringify(json));
})();