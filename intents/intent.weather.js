'use strict';

// -- Modules
import { intersect, relation } from 'intents/modules'
// -- Internal
const TERMS = ['weather', 'umbrella', 'rain', 'forecast', 'snow', 'fog', 'sun', 'cloud', 'meteo'];
const RELATIONS = ['when', 'location'];

export default (state, intent) => {

  return new Promise(async (resolve, reject) => {

    const tokens = intersect(TERMS, state.nlp.tokens);
    const classifiers = intersect(TERMS, state.classifier.categories);

    console.log('IntentWeather'.bold.green, `tokens: ${tokens.toString().green}, classifiers: ${classifiers.toString().green}`);

    if (tokens || classifiers) {
      const relations = relation(RELATIONS, state.nlp.relations);

      // -- @TODO: Iterate over all actions assigned to this intent
      // let [...] = await Promise.all([])
      await intent.actions[0].call(null, state, relations);

      resolve(state);
    } else {
      console.log('intent.weather.else')
      reject();
    }
  })
};
