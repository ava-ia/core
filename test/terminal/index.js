'use strict';

import colors from 'colors';
// -- Core
import Ava from '../../lib'
// -- Intents & Actions
import { weather, movie } from '../../lib/intents'
import { forecastYahoo, forecastMSN, movieDB } from '../../lib/actions'
// -- Internal
import metadata from './metadata'

// -- New instance of Ava (with custom config);
let ava = new Ava({
  multiResponse: true,
  // translator: {your_own_translator},
  // language: {your_own_language},
  // nlp: {your_own_nlp},
  // classifier: {your_own_classifier},
})

// -- Prepare intents
ava
  // .intent(weather, [forecastYahoo, forecastMSN])
  .intent(weather, [ forecastYahoo ])
  // .intent(weather, forecastMSN)
  // .intent(movie, movieDB)

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
