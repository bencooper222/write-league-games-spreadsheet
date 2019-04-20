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
exports.updateGames = async games => {
  const updateObject = games.reduce(
    (acc, game) => {
      acc.values.push(Object.values(game));
      return acc;
    },
    { range: `games!A1:${decodeColumn(Object.keys(games[0]).length)}1`, values: [] },
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

exports.getLast = async () => {
  return (await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEETS_SHEET_ID,
    range: 'games!A2:A',
  })).data.values
    .map(datestring => moment(datestring, 'M/D/YYYY H:m:s').tz('America/Chicago'))
    .reduce((acc, date) => (acc == null || acc.isBefore(date) ? date : acc), null);
};
