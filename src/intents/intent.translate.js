import { syntax, trace } from '../helpers';

const RULES = [
  'translate [Preposition]? [Demonym]',
  'translate * [Preposition] [Demonym]',
];

export default (state) => {
  const match = syntax(state.sentence, RULES);
  trace('IntentTranslate', { match }, state);

  return (match);
};
