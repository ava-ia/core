'use strict';

import { factoryActions, relation } from '../helpers'
// -- Internal
const RELATIONS = ['object', 'location'];

export default (state, actions) => {
  const { object, location } = relation(RELATIONS, state.nlp.relations);
  console.log('IntentKnowledge'.bold.green, `object: ${object}, location: ${location}`);

  if (location || object) {
    return factoryActions(state, actions)
  }
};
