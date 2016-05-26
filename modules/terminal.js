'use strict';

import Ava from './ava'

process.stdout.write('\x1Bc');
if (process.argv[2]) {
  Ava.listen(process.argv.slice(2).join(' '));
} else {
  Ava.says('Hi! How can I help you?');
}
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (text) => {
  if (text === 'bye\n') {
    Ava.says('Bye!')
    process.exit();
  }
  Ava.listen(text);
});
