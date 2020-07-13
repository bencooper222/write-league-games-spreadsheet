const fetch = require('node-fetch');

if (process.env.CI !== 'true') require('dotenv').config();

fetch(process.env.NETLIFY_BUILD_HOOK, {
  method: 'POST',
});
