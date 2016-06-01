'use strict';

// -- Core
import Ava from './ava'
// -- Adaptors
import {TranslatorGoogle, TranslatorYandex} from 'adaptors/translator'
import {ClassifierBayes} from 'adaptors/classifier'
import {NLPAlchemy, NLPCore, NLPCompromise, NLPNatural} from 'adaptors/nlp'
// -- Intents & Actions
import {IntentWeather} from 'intents'
import {ActionForecastIO} from 'actions'

process.stdout.write('\x1Bc');

let ava = new Ava({
    query: process.argv.slice(2).join(' '),
    // translator: TranslatorYandex,
    // classifier: ClassifierBayes,
    nlp: NLPCore,
  })
  .intent(IntentWeather, ActionForecastIO)
  // .intent([IntentWeather], [Number, 'Troll', String])
  // .catch(error => console.log('{ERROR}', error));

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (text) => {
  if (text === 'bye\n') {
    ava.output('Bye! See you soon!')
    process.exit();
  }
  ava.listen(text);
});
