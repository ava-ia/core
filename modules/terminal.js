'use strict';
process.stdout.write('\x1Bc');

import Ava from './ava'
const ava = new Ava({
  output: true,
  query: process.argv.slice(2).join(' ')
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (text) => {
  if (text === 'bye\n') {
    ava.output('Bye! See you soon!')
    process.exit();
  }
  ava.analize(text);

});
