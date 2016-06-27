'use strict';

import { factoryActions, resolve, syntax } from '../helpers';
// -- Internal
const RULES = [
  'how much is [value] [currency] [preposition] [currency]',
  'convert [value] [currency] [preposition] [currency]',
];

export default (state, actions) => {
  const match = syntax(state.sentence, RULES);
  if (state.debug) console.log('IntentConversor'.bold.green, 'match:'.bold, match);

  return (match ? factoryActions(state, actions) : resolve(state));
};
