'use strict';
process.stdout.write('\x1Bc');

import Ava from './ava'
const ava = new Ava({
  output: true,
  query: 'world'
});

if (process.argv[2]) {
  ava.listen(process.argv.slice(2).join(' '));
} else {
  ava.says('Hi! How can I help you?');
}
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (text) => {
  if (text === 'bye\n') {
    ava.output('Bye! See you soon!')
    process.exit();
  }
  ava.listen(text);
});
