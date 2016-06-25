'use strict';

import { factoryActions, resolve, syntax } from '../helpers'
// -- Internal
const RULES = [
  'translate [Preposition]? [Demonym]',
  'translate * [Preposition] [Demonym]',
];

export default (state, actions) => {
  const match = syntax(state.sentence, RULES);
  if (state.debug)
    console.log('IntentTranslate'.bold.green, 'match:'.bold, match);

  if (match) {
    return factoryActions(state, actions);
  } else {
    return resolve(state);
  }
};
