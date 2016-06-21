'use strict';

import colors from 'colors';
// -- Core
import Ava from '../../src'
// -- Intents & Actions
import { weather, movie, any } from '../../src/intents'
import { forecastYahoo, forecastMSN, movieDB, wikipedia } from '../../src/actions'
// -- Internal
import metadata from './metadata'

// -- New instance of Ava (with custom config);
let ava = new Ava({
  multiResponse: true,
})

// -- Prepare intents
ava
  .intent(weather, [forecastYahoo, forecastMSN])
  .intent(movie, movieDB)
  .intent(any, wikipedia)

const answer = (sentence) => {
  process.stdout.write('\x1Bc');
  ava
    .listen(sentence)
    .then(state => {
      metadata(state, 'magenta');
      console.log('<AVA>'.bold.green, state.action)
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
