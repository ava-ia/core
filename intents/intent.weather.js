'use strict';

// -- Modules
import { FactoryActions } from 'modules/ava/factories'
import { intersect } from 'intents/modules'
// -- Internal
const TERMS = ['weather', 'umbrella', 'rain', 'forecast', 'snow', 'fog', 'sun', 'cloud', 'meteo'];

export default (state, intent) => {
  return new Promise( async (resolve, reject) => {
    const tokens = intersect(TERMS, state.nlp.tokens);
    const classifiers = intersect(TERMS, state.classifier.categories);
    console.log('IntentWeather'.bold.green, `tokens: ${tokens.toString().green}, classifiers: ${classifiers.toString().green}`);

    if (tokens || classifiers) {
      await FactoryActions(state, intent.actions);

      resolve(state);

    } else {
      reject();
    }
  })
};
