import countries from 'world-countries';
import Compromise from 'nlp_compromise';
import googleTranslate from 'google-translate-api';
import { entities, trace } from '../helpers';
// -- Internal
const DEMONYM = 'Demonym';

export default async(state) => {
  let action;
  const actionIndex = state.tokens.indexOf('translate');
  const terms = Compromise.text(state.sentence).sentences[0].terms;
  let to;
  let demonymIndex;
  let sentence = '';

  terms.forEach((term, index) => {
    if (index > actionIndex) {
      if (term.tag === DEMONYM && demonymIndex === undefined) {
        const demonym = term.text.toLowerCase();
        const country = countries.find(item => item.demonym.toLowerCase() === demonym);

        if (country) {
          demonymIndex = index;
          to = country.cca2;
        }
      } else if (index > demonymIndex) {
        sentence += `${term.text} `;
      }
    }
  });

  trace('ActionTranslator', { sentence, to }, state);
  if (sentence && to) {
    const response = await googleTranslate(sentence, { to });
    action = { engine: 'google', entity: entities.knowledge, value: response.text };
  }

  return action;
};
