'use strict';

import colors from 'colors';
import fetch from 'node-fetch';
import ora from 'ora';

const trace = ora();

// -- Core
import Ava from '../../src';
import { weather, movie, translate, conversor, any } from '../../src/intents';
import { forecastYahoo, forecastMSN, movieDB, translator, currency, wikipedia, math } from '../../src/actions';
// -- Internal
const timeout = 10000;
const keys = ['rawSentence', 'sentence', 'language', 'classifier', 'type', 'topics', 'tags', 'tokens', 'relations', 'sentiment']

// -- New instance of Ava (with custom config);
const ava = new Ava({
  debug: trace,
})

// -- Prepare intents
ava
  .intent(weather, [forecastYahoo])
  .intent(movie, movieDB)
  .intent(translate, translator)
  .intent(conversor, currency)
  .intent(any, math, wikipedia)

const traceKeys = (state) => keys.map(key => trace.stopAndPersist(`${key.grey} ${state[key]}`));

const answer = (sentence) => {
  process.stdout.write('\x1Bc');
  trace.start();
  ava
    .listen(sentence, timeout)
    .then(state => {
      traceKeys(state);
      trace.succeed(JSON.stringify(state.action));
    })
    .catch(error => {
      traceKeys(state);
      trace.fail(error || `Sorry but I didn't understand you`);
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
