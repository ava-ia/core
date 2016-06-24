'use strict';

import { factoryActions, intersect, match, resolve } from '../helpers'
// -- Internal
const TERMS = [
  'translate'
];
const MATCH_RULE = 'translate [Preposition]? [Demonym]';

export default (state, actions) => {
  const tokens = intersect(TERMS, state.tokens);
  const matchRule = match(state.sentence, MATCH_RULE);
  console.log('IntentTranslate'.bold.green, 'tokens:'.bold, tokens, 'matchRule:'.bold, matchRule);

  if (tokens || matchSentence) {
    return factoryActions(state, actions);
  } else {
    return resolve(state);
  }
};
