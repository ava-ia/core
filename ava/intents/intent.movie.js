'use strict';

// -- Modules
import { FactoryActions } from 'ava/factories'
import { intersect } from 'ava/intents/modules'
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

export default (state, intent) => {
  return new Promise( async (resolve, reject) => {
    const tokens = intersect(TERMS, state.nlp.tokens);
    const classifiers = intersect(TERMS, state.classifier.categories);
    console.log('IntentMovie'.bold.green, `tokens: ${tokens.toString().green}, classifiers: ${classifiers.toString().green}`);

    if (tokens || classifiers) {
      await FactoryActions(state, intent.actions);
      resolve(state);

    } else {
      reject();
    }
  })
};
