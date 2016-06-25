'use strict';

import colors from 'colors';
import fetch from 'node-fetch';
// -- Core
import Ava from '../../src'
// -- Intents & Actions
import { weather, movie, translate, any } from '../../src/intents'
import { forecastYahoo, forecastMSN, movieDB, wikipedia, translator } from '../../src/actions'
// -- Internal
import metadata from './metadata'
const timeout = 10000;

// -- New instance of Ava (with custom config);
let ava = new Ava({
  debug: true,
})

// -- Prepare intents
ava
  // .intent(weather, [forecastYahoo, forecastMSN])
  // .intent(movie, movieDB)
  .intent(translate, translator)
  // .intent(any, wikipedia)

const answer = (sentence) => {
  process.stdout.write('\x1Bc');
  ava
    .listen(sentence, timeout)
    .then(state => {
      // metadata(state, 'magenta');
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

// ----
// fetch('http://www.wikiwand.com/api/searchwiki/en/Leonardo')
// fetch('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=Neuschwanstein%20Castle&redirects=')
//   .then(response => response.json())
//   .then(body => {
//     console.log('???', body)
//   });
