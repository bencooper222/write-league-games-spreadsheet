const { google } = require('googleapis');
const client = require('./googleClient');
const { decodeColumn } = require('excel-utils');
const moment = require('moment-timezone');
client.setCredentials({
  access_token: process.env.SHEETS_ACCESS_TOKEN,
  refresh_token: process.env.SHEETS_REFRESH_TOKEN,
  scope: process.env.SHEETS_SCOPE,
  token_type: process.env.SHEETS_TOKEN_TYPE,
  // @ts-ignore
  expiry_date: process.env.SHEETS_EXPIRY_DATE,
});

const sheets = google.sheets({
  version: 'v4',
  auth: client,
});

// take from: https://github.com/bencooper222/build-your-own-mint/blob/master/lib/update.js
exports.updateGames = async (games, summonerName) => {
  const updateObject = games.reduce(
    (acc, game) => {
      acc.values.push(Object.values(game));
      return acc;
    },
    {
      range: `${summonerName}!A1:${decodeColumn(Object.keys(games[0]).length)}1`,
      values: [],
    },
  );

  sheets.spreadsheets.values.append(
    {
      spreadsheetId: process.env.SHEETS_SHEET_ID,

      valueInputOption: `USER_ENTERED`,
      range: updateObject.range,
      resource: {
        range: updateObject.range,
        values: updateObject.values,
        majorDimension: 'ROWS',
      },
    },
    (err, res) => {
      if (err) {
        return console.log('Update failed: ', err);
      }

      console.log(`Success! ${res.data.updates.updatedCells} game data cells updated.`);
    },
  );
};

exports.getLast = async summonerName => {
  const sheetData = (
    await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEETS_SHEET_ID,
      range: `${summonerName}!A2:D`,
    })
  ).data.values;

  const datetimeDurationList = sheetData.map(([datestring, _, __, duration]) => ({
    datetime: moment.tz(datestring, 'M/D/YYYY H:m:s', 'America/Chicago'),
    duration: Number(duration),
  }));

  const last = datetimeDurationList.reduce((acc, datetimeDuration) => {
    if (acc === null) return datetimeDuration;
    if (acc.datetime.isBefore(datetimeDuration.datetime)) return datetimeDuration;

    return acc;
  }, null);

  return last;
};

exports.getChallengeInfo = async (summonerName, startRow, endRow) => {
  return (
    await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEETS_SHEET_ID,
      range: `${summonerName}!C${startRow}:G${endRow ? endRow : ''}`,
    })
  ).data.values;
};
