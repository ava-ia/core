import { factoryActions, resolve, syntax, trace } from '../helpers';
// -- Internal
const RULES = [
  'translate [Preposition]? [Demonym]',
  'translate * [Preposition] [Demonym]',
];

export default (state, actions) => {
  const match = syntax(state.sentence, RULES);
  trace('IntentTranslate', { match }, state);

  return (match ? factoryActions(state, actions) : resolve(state));
};
