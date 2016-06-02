'use strict';

// -- Core
import Ava from './ava'
// -- Adaptors
import {TranslatorGoogle, TranslatorYandex} from 'composers/translator'
import {ClassifierBayes} from 'composers/classifier'
import {NLPAlchemy, NLPCore, NLPCompromise} from 'composers/nlp'
// -- Intents & Actions
import {IntentWeather} from 'intents'
import {ActionForecastYahoo} from 'actions'

process.stdout.write('\x1Bc');

let ava = new Ava({
    query: process.argv.slice(2).join(' '),
    // translator: TranslatorYandex,
    // classifier: ClassifierBayes,
    // nlp: NLPAlchemy,
  })
  .intent(IntentWeather, [ActionForecastYahoo])
  .catch(error => console.log('{ERROR}', error));

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (text) => {

  if (text === 'bye\n') {
    ava.output('Bye! See you soon!')
    process.exit();
  }
  ava.listen(text.replace('\n', ''));
});
