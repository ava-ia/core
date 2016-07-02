'use strict';

import colors from 'colors';
import fetch from 'node-fetch';
// -- Core
import Ava from '../../lib';
import { weather, movie, translate, conversor, any } from '../../lib/intents';
import { forecastYahoo, forecastMSN, movieDB, translator, currency, wikipedia } from '../../lib/actions';
// -- Internal
const timeout = 10000;

// -- New instance of Ava (with custom config);
let ava = new Ava({
  debug: true,
})

// -- Prepare intents
ava
  .intent(weather, [forecastYahoo, forecastMSN])
  .intent(movie, movieDB)
  .intent(translate, translator)
  .intent(conversor, currency)
  .intent(any, wikipedia)

const answer = (sentence) => {
  process.stdout.write('\x1Bc');
  ava
    .listen(sentence, timeout)
    .then(state => {
      console.log('<AVA>'.bold.green, state);
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
