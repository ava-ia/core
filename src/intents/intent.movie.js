import { factoryActions, intersect, resolve, trace } from '../helpers';
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
  'producer',
];

export default (state, actions) => {
  const tokens = intersect(TERMS, state.tokens);
  const classifiers = intersect(TERMS, state.classifier);

  trace('IntentMovie', { tokens, classifiers }, state);
  return (tokens || classifiers) ? factoryActions(state, actions) : resolve(state);
};
