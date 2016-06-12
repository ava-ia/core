'use strict';

import colors from 'colors';
// -- Core
import AVA from '../ava'
// -- Intents & Actions
import { IntentWeather, IntentMovie } from '../intents'
import { ActionForecastYahoo, ActionForecastMSN, ActionMovieDB } from '../actions'
// -- Internal
import metadata from './metadata'

// -- New instance of AVA (with custom config);
let ava = new AVA({
  multiResponse: true,
  // translator: {your_own_translator},
  // language: {your_own_language},
  // nlp: {your_own_nlp},
  // classifier: {your_own_classifier},
})

// -- Prepare intents
ava
  // .intent(IntentWeather, [ActionForecastYahoo, ActionForecastMSN])
  .intent(IntentWeather, ActionForecastYahoo)
  // .intent(IntentWeather, ActionForecastMSN)
  // .intent(IntentMovie, ActionMovieDB)

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
