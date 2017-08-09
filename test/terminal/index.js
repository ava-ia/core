'use strict';

import colors from 'colors';
import fetch from 'node-fetch';
import ora from 'ora';

const trace = ora();

// -- Core
import Ava from '../../src';
import { calc, weather, movie, translate, conversor, any } from '../../src/intents';
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
  .intent(weather, [forecastMSN])
  .intent(movie, movieDB)
  .intent(translate, translator)
  .intent(conversor, currency)
  .intent(calc, math)
  // .intent(any, [wikipedia])

const traceKeys = (state) => keys.map(key => trace.stopAndPersist(`${key.grey} ${state[key]}`));

const answer = async (sentence) => {
  process.stdout.write('\x1Bc');
  trace.start();

  // const answer = await ava.listen(sentence, timeout).catch(error => console.log('error'));
  // traceKeys(answer);
  // trace.succeed(JSON.stringify(answer.action));

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
