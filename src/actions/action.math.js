import { entities, syntax, trace } from '../helpers';

const SYNTAXES = [
  '. [Value] [Preposition] [Value]',
  '[Value] . [Preposition] [Value]',
  '[Value][Symbol][Value]',
  '[Value] [Symbol] [Value]',
  '[Value] . [Value]',
];

const OPERATIONS = [
  { calc: (a, b) => a + b, terms: ['+', 'plus', 'add'] },
  { calc: (a, b) => a - b, terms: ['-', 'minu', 'subtract'] },
  { calc: (a, b) => a * b, terms: ['*', 'multiply'] },
  { calc: (a, b) => a / b, terms: ['/', 'divided', 'divides'] },
];

export default (state) => {
  let action;
  const match = syntax(state.sentence, SYNTAXES);
  if (!match) return action;

  const operator = match.noun || match.conjunction || match.infinitive || match.symbol;
  const a = parseFloat(match.value[0]);
  const b = parseFloat(match.value[1]);

  trace('ActionMath', { operator, a, b }, state);

  if (operator && a && b) {
    Object.values(OPERATIONS).forEach((operation) => {
      if (operation.terms.indexOf(operator) >= 0) {
        const value = operation.calc(a, b);
        action = {
          engine: 'ava',
          title: `It's ${value}`,
          value,
          entity: entities.number,
        };
      }
    });
  }

  return action;
};
