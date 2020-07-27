require('dotenv').config();
const sheetApi = require('../src/sheet');
const fs = require('fs');

const { champMap } = require('../src/constants');
const sortedChamps = Object.values(champMap).sort((a, b) => a.localeCompare(b));

const nextChampMap = sortedChamps.reduce((acc, el, idx) => {
  acc[el] = sortedChamps[idx + 1];
  return acc;
}, {});
// console.log(nextChampMap);
const skyfall3665Start = ['05/26/2020 22:27:54', 126];
const avol9Start = ['05/08/2020 21:59:21', 2];

const filterGames = games => {
  const onlyReal = games
    .filter(
      ([queue, duration]) =>
        (queue === '5v5 Ranked Solo games' ||
          queue === '5v5 Draft Pick games' ||
          queue === '5v5 Ranked Flex games' ||
          queue === '5v5 Blind Pick games') &&
        Number(duration) > 4.5,
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
  const rtn = [{ x: 0, y: 0, champ: 'Start' }];

  let countChamps = 0;
  let lastWinIdx = filteredGames.length - 1;
  for (let i = 0; i < filteredGames.length; i++) {
    const game = filteredGames[i];
    if (game[3]) {
      lastWinIdx = i;
      countChamps++;
      rtn.push({
        y: i + 1,
        x: countChamps,

        champ: game[4],
      });
    }
  }

  // if there are games for the challenge after the last win, this array will be non-empty
  // these are games for the inprogress champion (should all be losses)
  const inProgressChampGames = filteredGames.slice(lastWinIdx + 1);
  if (inProgressChampGames.length > 0)
    rtn.push({
      y: rtn[rtn.length - 1].y + inProgressChampGames.length,
      x: countChamps,
      champ: inProgressChampGames[0][4],
      won: false,
    });
  // won should always be false but to make bugs easier to notice, I'm using the value
  //  for (const [_, __, ___, won, champ] of inProgressChampGames) {
  //  rtn.push({ y: rtn[rtn.length - 1].y + 1, x: countChamps, champ, won });
  // }

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
