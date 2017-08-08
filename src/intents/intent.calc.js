import { factoryActions, intersect, resolve, trace } from '../helpers';
// -- Internal
const TERMS = [
  '+', 'plus', 'add',
  '-', 'minu', 'subtract',
  '*', 'multiply',
  '/', 'divided', 'divides',
];

export default (state, actions) => {
  const tokens = intersect(TERMS, state.tokens);

  trace('IntentMaths', { tokens }, state);

  return (tokens) ? factoryActions(state, actions) : resolve(state);
};
