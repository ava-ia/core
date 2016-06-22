'use strict';

import { factoryActions, intersect, resolve } from '../helpers'
// -- Internal
const TERMS = ['weather', 'umbrella', 'rain', 'forecast', 'snow', 'fog', 'sun', 'cloud', 'meteo'];

export default (state, actions) => {
  const tokens = intersect(TERMS, state.tokens);
  const classifiers = intersect(TERMS, state.classifier.categories);
  console.log('IntentWeather'.bold.green, `tokens: ${tokens.toString().green}, classifiers: ${classifiers.toString().green}`);

  if (tokens || classifiers) {
    return factoryActions(state, actions);
  } else {
    return resolve(state);
  }
};
