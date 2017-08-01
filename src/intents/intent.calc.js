import { factoryActions, intersect, resolve } from '../helpers';
// -- Internal
const TERMS = [
  '+', 'plus', 'add',
  '-', 'minu', 'subtract',
  '*', 'multiply',
  '/', 'divided', 'divides',
];

export default (state, actions) => {
  const tokens = intersect(TERMS, state.tokens);

  if (state.debug) {
    console.log('IntentMaths'.bold.green, `tokens: ${tokens.toString().green}, classifiers: ${classifiers.toString().green}`);
  }

  return (tokens) ? factoryActions(state, actions) : resolve(state);
};
