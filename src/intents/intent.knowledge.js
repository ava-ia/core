'use strict';

import { factoryActions, relation } from '../helpers'
// -- Internal
const RELATIONS = ['object', 'location'];

export default (state, intent) => {
  const { object, location } = relation(RELATIONS, state.nlp.relations);
  console.log('IntentKnowledge'.bold.yellow, `object: ${object}, location: ${location}`);

  if (location || object) {
    return factoryActions(state, intent.actions)
  }
};
