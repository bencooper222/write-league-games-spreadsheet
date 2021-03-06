const league = new (require('leaguejs'))(process.env.LEAGUE_KEY);
const fetch = require('node-fetch');
const moment = require('moment-timezone');

const Bottleneck = require('bottleneck');
const limiter = new Bottleneck({
  minTime: 1320, // 100 request per 2 min with a little wiggle room
  maxConcurrent: 1,
});
const { season, queue, summSpell, champion } = require('./constants');

exports.getSummonerDataBetween = async (summonerName, beginTime, endTime) => {
  const matchList = (
    await league.Match.gettingListByAccount(
      await getEncryptedAccountId(summonerName),
      process.env.LEAGUE_API_PLATFORM_ID,
      { beginTime, endTime },
    )
  ).matches.reduceRight((acc, el) => acc.concat(el), []);

  return Promise.all(
    matchList.map(async (match, idx) =>
      getGameData(match.gameId, summonerName, idx, matchList.length),
    ),
  );
};

const getGameData = async (matchId, summonerName, logIdx, numMatches) => {
  if (logIdx % 5 === 0) console.log(`Starting ${logIdx + 1} of ${numMatches}`);
  //   const fullData = await league.Match.gettingById(matchId);
  // the leaguejs module api for this just... breaks
  const fullData = await requestGameData(matchId);

  const yourParticpantId = fullData.participantIdentities.find(
    ident => ident.player.summonerName === summonerName,
  ).participantId;

  const yourData = fullData.participants.find(
    participant => participant.participantId === yourParticpantId,
  );

  const yourTeam = fullData.teams.find(team => team.teamId === yourData.teamId);
  const theirTeam = fullData.teams.find(team => team.teamId !== yourData.teamId);

  return {
    // datetime: format(new Date(fullData.gameCreation), 'MM/DD/YYYY HH:mm:ss'),
    datetime: moment
      .utc(fullData.gameCreation)
      .tz('America/Chicago')
      .format('MM/DD/YYYY HH:mm:ss'),
    season: season(fullData.seasonId),
    queue: queue(fullData.queueId),
    duration: fullData.gameDuration / 60, //minutes
    patch: fullData.gameVersion
      .split('.')
      .slice(0, 2)
      .join('.'),
    win: yourTeam.win === 'Win',

    // start your information
    yourChamp: champion(yourData.championId),
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
    ...(await createBanList(
      yourTeam.bans.map(ban => ban.championId),
      'your',
    )),
    ...(await createBanList(
      theirTeam.bans.map(ban => ban.championId),
      'their',
    )),
    ...(await createTeamList(
      fullData.participants
        .filter(participant => participant.teamId === yourTeam.teamId)
        .map(
          filtParticipant =>
            fullData.participantIdentities.find(
              ident => ident.participantId === filtParticipant.participantId,
            ).player.summonerName,
        ),
      'your',
    )),
    // having their teamlist isn't very useful
    // ...(await createTeamList(
    //   fullData.participants
    //     .filter(participant => participant.teamId !== yourTeam.teamId)
    //     .map(
    //       filtParticipant =>
    //         fullData.participantIdentities.find(
    //           ident => ident.participantId === filtParticipant.participantId,
    //         ).player.summonerName,
    //     ),
    //   'their',
    // )),
  };
};

const requestGameData = async matchId => {
  const data = await limiter.schedule(() =>
    fetch(
      `https://${process.env.LEAGUE_API_PLATFORM_ID}.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${process.env.LEAGUE_KEY}`,
    ),
  );

  return data.json();
};

const getEncryptedAccountId = async summonerName => {
  const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.LEAGUE_KEY}`;

  const json = await (await fetch(url)).json();

  return json.accountId;
};

const createGenericList = async (list, cycleName, keyPreface, useAPI = true) => {
  const rtn = {};

  for (let idx = 0; idx < list.length; idx++)
    rtn[`${keyPreface}${cycleName}${idx}`] = useAPI ? champion(list[idx]) : list[idx];

  for (let i = list.length; i < 5; i++) rtn[`${keyPreface}${cycleName}${i}`] = '';

  return rtn;
};

const createBanList = async (bans, keyPreface) => createGenericList(bans, 'ban', keyPreface);

const createPickList = async (picks, keyPreface) => createGenericList(picks, 'pick', keyPreface);

const createTeamList = async (mates, keyPreface) =>
  createGenericList(mates, 'mate', keyPreface, false);
