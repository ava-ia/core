'use strict';

// -- Modules
import { intersect, relation } from 'intents/modules'
// -- Internal
const TERMS = ['weather', 'umbrella', 'rain', 'forecast', 'snow', 'fog', 'sun', 'cloud'];
const RELATIONS = ['when', 'location'];

export default (ava, request, action) => {
  const tokens = intersect(TERMS, request.nlp.tokens);
  const classifiers = intersect(TERMS, request.classifier.categories);

  ava.output('IntentWeather'.green);
  console.log(`tokens: ${tokens.toString().green}, classifiers: ${classifiers.toString().green}`);

  if (tokens || classifiers) {
    action.call(null, ava, request, relation(RELATIONS, request.nlp.relations));
  }
};
