const league = new (require('leaguejs'))(process.env.LEAGUE_KEY);
const fetch = require('node-fetch');
const format = require('date-fns/format');
const Bottleneck = require('bottleneck');
const limiter = new Bottleneck({
  minTime: 123, // 100 request per 2 min with a little wiggle room
  maxConcurrent: 1,
});
const { season, queue, summSpell, champion } = require('./constants');

exports.getSummonerDataSince = async beginTime => {
  const matchList = (await league.Match.gettingListByAccount(
    process.env.LEAGUE_ACCOUNT_ID,
    process.env.LEAGUE_API_PLATFORM_ID,
    { beginTime },
  )).matches;

  return Promise.all(matchList.map(async (match, idx) => getGameData(match.gameId)));
};

const getGameData = async matchId => {
  //   const fullData = await league.Match.gettingById(matchId);
  // the leaguejs module api for this just... breaks
  const fullData = await requestGameData(matchId);

  const yourParticpantId = fullData.participantIdentities.find(
    ident => ident.player.accountId === process.env.LEAGUE_ACCOUNT_ID,
  ).participantId;

  const yourData = fullData.participants.find(
    participant => participant.participantId === yourParticpantId,
  );

  const yourTeam = fullData.teams.find(team => team.teamId === yourData.teamId);
  const theirTeam = fullData.teams.find(team => team.teamId !== yourData.teamId);

  return {
    datetime: format(new Date(fullData.gameCreation)),
    season: season(fullData.seasonId),
    queue: queue(fullData.queueId),
    duration: fullData.gameDuration / 60, //minutes
    patch: fullData.gameVersion
      .split('.')
      .slice(0, 2)
      .join('.'),
    win: yourTeam.win === 'Win',

    // start your information
    yourLane: yourData.timeline.lane,
    yourKills: yourData.stats.kills,
    yourDeaths: yourData.stats.deaths,
    yourAssists: yourData.stats.assists,
    yourSumm1: summSpell(yourData.spell1Id),
    yourSumm2: summSpell(yourData.spell2Id),
    yourDamageDealtToChamps: yourData.stats.totalDamageDealtToChampions,
    yourVisionScore: yourData.stats.visionScore,
    yourCS: yourData.stats.totalMinionsKilled,
    yourGold: yourData.stats.goldEarned,
    yourCCTime: yourData.stats.timeCCingOthers,

    // start team information
    gotHerald: yourTeam.firstRiftHerald,
    drags: yourTeam.dragonKills,
    barons: yourTeam.baronKills,
    inhibs: yourTeam.inhibitorKills,
    firstBlood: yourTeam.firstBlood,
    // start generic information
    ...(await createPickList(
      fullData.participants
        .filter(participant => participant.teamId === yourTeam.teamId)
        .map(teammate => teammate.championId),
      'your',
    )),
    ...(await createPickList(
      fullData.participants
        .filter(participant => participant.teamId !== yourTeam.teamId)
        .map(teammate => teammate.championId),
      'their',
    )),
    ...(await createBanList(yourTeam.bans.map(ban => ban.championId), 'your')),
    ...(await createBanList(theirTeam.bans.map(ban => ban.championId), 'their')),
  };
};

const requestGameData = async matchId => {
  const data = await limiter.schedule(() =>
    fetch(
      `https://${
        process.env.LEAGUE_API_PLATFORM_ID
      }.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${
        process.env.LEAGUE_KEY
      }`,
    ),
  );

  return data.json();
};

const createGenericList = async (list, cycleName, keyPreface) => {
  const rtn = {};

  for (let idx = 0; idx < list.length; idx++)
    rtn[`${keyPreface}${cycleName}${idx}`] = champion(list[idx]);

  for (let i = list.length; i < 5; i++) rtn[`${keyPreface}${cycleName}${i}`] = '';

  return rtn;
};

const createBanList = async (bans, keyPreface) =>
  createGenericList(bans, 'ban', keyPreface);

const createPickList = async (picks, keyPreface) =>
  createGenericList(picks, 'pick', keyPreface);
