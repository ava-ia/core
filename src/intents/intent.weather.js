import { intersect, trace } from '../helpers';
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
  'meteo',
];

export default (state) => {
  const tokens = intersect(TERMS, state.tokens);
  const classifiers = intersect(TERMS, state.classifier);
  trace('IntentWeather', { tokens, classifiers }, state);

  return (tokens || classifiers);
};
