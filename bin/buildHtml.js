/**
 * This script copies src/client/assets/index.html into build/client/index.html
 * This is useful for our built production code.
 */

/*eslint-disable no-console */

const fs = require('fs');
const colors = require('colors');
const cheerio = require('cheerio');

fs.readFile('src/client/assets/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.error(err);
  }

  const $ = cheerio.load(markup);

  $('head').append('<link rel="stylesheet" href="/css/app.css">');
  try {
  fs.mkdirSync('build');
  fs.mkdirSync('build/client');
  } catch(e) {
    console.log('directory already exisits', e);
  }

  fs.writeFile('build/client/index.html', $.html(),{
                encoding: 'utf8',
                flag: 'w'
            }, (err) => {
    if (err) {
      console.log('rajaguru', err);
      return console.error(err);
    }
  });

  console.log('index.html written to /build/client'.green);
});
