import { intersect, trace } from '../helpers';
// -- Internal
const TERMS = [
  '+', 'plus', 'add',
  '-', 'minu', 'subtract',
  '*', 'multiply',
  '/', 'divided', 'divides',
];

export default (state) => {
  const tokens = intersect(TERMS, state.tokens);
  trace('IntentMaths', { tokens }, state);

  return (tokens);
};
