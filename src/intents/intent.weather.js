import { factoryActions, intersect, resolve } from '../helpers'
// -- Internal
const TERMS = [
  'weather',
  'umbrella',
  'rain',
  'forecast',
  'snow',
  'fog',
  'sun',
  'cloud',
  'meteo'
]

export default (state, actions) => {
  const tokens = intersect(TERMS, state.tokens)
  const classifiers = intersect(TERMS, state.classifier)
  if (state.debug) {
    console.log('IntentWeather'.bold.green, `tokens: ${tokens.toString().green}, classifiers: ${classifiers.toString().green}`)
  }

  return (tokens || classifiers) ? factoryActions(state, actions) : resolve(state)
}
