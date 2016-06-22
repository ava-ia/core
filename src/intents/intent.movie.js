'use strict';

import { factoryActions, intersect, resolve } from '../helpers'
// -- Internal
const TERMS = [
  'film',
  'movie',
  'show',
  'actor',
  'director',
  'camera',
  'editor',
  'cinema',
  'tv',
  'producer'
];

export default (state, actions) => {
  const tokens = intersect(TERMS, state.tokens);
  const classifiers = intersect(TERMS, state.classifier.categories);
  console.log('IntentMovie'.bold.green, `tokens: ${tokens.toString().green}, classifiers: ${classifiers.toString().green}`);

  if (tokens || classifiers) {
    return factoryActions(state, actions);
  } else {
    return resolve(state);
  }
};
