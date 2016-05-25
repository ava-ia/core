'use strict';

import cld from 'cld';
import colors from 'colors';
import Hope from 'hope';
// -- Adaptors
import Language from '../adaptors/language'
import NLPSalient from '../adaptors/nlp.salient'
import NLPAlchemy from '../adaptors/nlp.alchemy'
// -- Modules
import Ava from './ava'

const listen = (text) => {
  console.log(text);

  let request = {
    input: text,
    sentence: text,
    language: null,
    nlp: {}
  };
  Hope.chain([
    () => Language(request)
  ,
    (error, request) => NLPSalient(request)
  ,
    (error, request) => NLPAlchemy(request)
  ]).then((error, request) => {
    Ava('...');
  });
}

process.stdout.write('\x1Bc');
Ava('Hi! How can I help you?');
listen(process.argv.slice(2).join(' '));

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (text) => {
  if (text === 'bye\n') {
    Ava('Bye!')
    process.exit();
  }

  listen(text);
});
