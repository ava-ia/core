import { entities, resolve, syntax } from '../helpers'

const SYNTAXES = [
  '. [Value] [Preposition] [Value]',
  '[Value] . [Preposition] [Value]',
  '[Value][Symbol][Value]',
  '[Value] . [Value]'
]

const OPERATIONS = [
  { calc: (a, b) => a + b, terms: ['+', 'plus', 'add'] },
  { calc: (a, b) => a - b, terms: ['-', 'minu', 'subtract'] },
  { calc: (a, b) => a * b, terms: ['*', 'multiply'] },
  { calc: (a, b) => a / b, terms: ['/', 'divided', 'divides'] }
]

export default (state) => {
  const ms = new Date()
  const match = syntax(state.sentence, SYNTAXES)
  if (!match) return resolve(state)
  const operation = match.noun || match.conjunction || match.infinitive || match.symbol
  const a = parseFloat(match.value[0])
  const b = parseFloat(match.value[1])

  if (state.debug) {
    console.log('ActionMath'.bold.yellow, 'operation:'.bold, operation, 'a:'.bold,  a, 'b:'.bold,  b)
  }

  if (operation && a && b) {
    for (const type of OPERATIONS) {
      if (type.terms.indexOf(operation) > -1) {
        const value = type.calc(a, b)
        state.action = {
          ms: (new Date() - ms),
          engine: 'ava',
          title: `It's ${value}`,
          value,
          entity: entities.number
        }

        break
      }
    }
  }

  return resolve(state)
}
