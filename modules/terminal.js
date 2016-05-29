'use strict';

import {NLPSalient, NLPAlchemy, NLPWatson} from 'adaptors/nlp'
import {TranslatorGoogle, TranslatorYandex} from 'adaptors/translator'

process.stdout.write('\x1Bc');

import Ava from './ava'
const ava = new Ava({
  query: process.argv.slice(2).join(' '),
  // translator: TranslatorYandex,
  // nlp: NLPSalient,
  intents: ['weather'],
  action: ['url']
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
