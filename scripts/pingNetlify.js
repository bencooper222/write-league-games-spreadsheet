const fetch = require('node-fetch');

if (process.env.CI !== 'true') require('dotenv').config();
(async () => {
  try {
    const res = await fetch(process.env.NETLIFY_BUILD_HOOK, {
      method: 'POST',
    });
    if (res.ok) {
      console.log('Pinged netlify!');
      process.exit(0);
    }
  } catch (err) {}

  console.error("Ping didn't work");
  process.exit(1);
})();
