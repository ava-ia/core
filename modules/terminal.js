'use strict';

import colors from 'colors';
// -- Core
import Ava from './ava'
// -- Adaptors
import {TranslatorGoogle, TranslatorYandex} from 'composers/translator'
import {ClassifierBayes} from 'composers/classifier'
import {NLPAlchemy, NLPCore, NLPCompromise} from 'composers/nlp'
// -- Intents & Actions
import {IntentWeather} from 'intents'
import {ActionForecastYahoo, ActionForecastMSN} from 'actions'
// -- Internal
import metadata from './metadata'


// -- New instance of AVA (with customo config);
let ava = new Ava({
  uniqueAction: true,
  // translator: TranslatorYandex,
  // classifier: ClassifierBayes,
  // nlp: NLPAlchemy,
})
// -- Prepare intents
ava
  .intent(IntentWeather, [ActionForecastYahoo, ActionForecastMSN])

const answer = (sentence) => {
  process.stdout.write('\x1Bc');
  ava
    .listen(sentence)
    .then(state => {
      metadata(state, 'magenta');
      console.log('<AVA>'.bold.green, state.actions[0])
    })
    .catch(error => {
      console.log('<AVA>'.bold.red, error || `Sorry but I didn't understand you`)
    })
}

// -- Console
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (text) => {
  if (text === 'bye\n') {
    process.exit();
  } else {
    answer(text.replace('\n', ''));
  }
});



answer(process.argv.slice(2).join(' '))
