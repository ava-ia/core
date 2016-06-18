'use strict';

import { factoryActions, intersect } from '../helpers'
// -- Internal
const TERMS = ['weather', 'umbrella', 'rain', 'forecast', 'snow', 'fog', 'sun', 'cloud', 'meteo'];

export default (state, intent) => {

  const tokens = intersect(TERMS, state.nlp.tokens);
  const classifiers = intersect(TERMS, state.classifier.categories);
  console.log('IntentWeather'.bold.green, `tokens: ${tokens.toString().green}, classifiers: ${classifiers.toString().green}`);

  if (tokens || classifiers) {
    return factoryActions(state, intent.actions)
  }
};
