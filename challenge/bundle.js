const fs = require('fs');
const path = require('path');

const parcel = require('parcel-bundler');
const puppeteer = require('puppeteer');

const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');

const chokidar = require('chokidar');
// const purify = require('purify-css');

const PORT = 1234;
const imgPath = 'dist/og.png';

async function getImage() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `./${imgPath}` }); // TODO: add clip property

  await browser.close();
}

(async () => {
  const bundler = new parcel(path.join(__dirname, './index.html'), {
    publicUrl: './',
    watch: false,
    minify: true,
    scopeHoist: true,
  });

  await bundler.bundle();

  const server = http.createServer(function onRequest(req, res) {
    serveStatic('dist', { index: ['index.html'] })(req, res, finalhandler(req, res));
  });
  server.listen(PORT);

  await getImage();

  const closeServer = path => {
    if (path === imgPath) {
      console.log(`server closed because ${path} added`);
      server.close();
      watcher.close();
      process.exit(0);
    }
  };

  const watcher = chokidar
    .watch(`.`, {
      ignored: /node_modules|.git|.cache/,
    })
    .on('add', closeServer);
})();
