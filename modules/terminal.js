'use strict';

import cld from 'cld';
import colors from 'colors';
import Hope from 'hope';
// -- Adaptors
import Language from '../adaptors/language'
import NLPSalient from '../adaptors/nlp.salient'
// -- Modules
import Ava from './ava'

process.stdout.write('\x1Bc');
Ava('Hi! How can I help you?');

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (text) => {
  Hope.chain([
    () => Language(text)
  ,
    (error, value) => NLPSalient(text, value)
  ]).then((errors, values) => {
    Ava('...');
  });

  if (text === 'bye\n') {
    Ava('Bye!')
    process.exit();
  }
});
