'use strict';

import {NLPSalient, NLPAlchemy, NLPWatson, NLPCompromise, NLPNatural} from 'adaptors/nlp'
import {TranslatorGoogle, TranslatorYandex} from 'adaptors/translator'
import {ClassifierBayes} from 'adaptors/classifier'
import {IntentWeather} from 'intents'
import Ava from './ava'

process.stdout.write('\x1Bc');

let ava = new Ava({
    query: process.argv.slice(2).join(' '),
    // translator: TranslatorYandex,
    // classifier: ClassifierBayes,
    nlp: NLPCompromise,
  })
  .intent(IntentWeather, Date)
  .intent([IntentWeather], [Number, 'Troll', String])
  .catch(error => console.log('{ERROR}', error));

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (text) => {
  if (text === 'bye\n') {
    ava.output('Bye! See you soon!')
    process.exit();
  }
  ava.listen(text);
});
