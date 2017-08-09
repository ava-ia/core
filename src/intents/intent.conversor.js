import { syntax, trace } from '../helpers';
// -- Internal
const RULES = [
  'how much is [value] [currency] [preposition] [currency]',
  'convert [value] [currency] [preposition] [currency]',
];

export default (state) => {
  const match = syntax(state.sentence, RULES);
  trace('IntentConversor', { match }, state);

  return (match);
};
