import countries from 'world-countries';
import Compromise from 'nlp_compromise';
import googleTranslate from 'google-translate-api';
import { entities } from '../helpers';
// -- Internal
const DEMONYM = 'Demonym';
const PREPOSITION = 'Preposition';

export default (state) => {

  return new Promise((resolve, reject) => {
    const actionIndex = state.tokens.indexOf('translate');
    const terms = Compromise.text(state.sentence).sentences[0].terms;
    const ms = new Date();
    let to;
    let demonymIndex;
    let sentence = '';

    terms.map((term, index) => {
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

    if (state.debug) {
      console.log('ActionTranslator'.bold.yellow, 'sentence:'.bold, sentence, 'to:'.bold, to);
    }

    if (sentence && to) {
      googleTranslate(sentence, { to })
        .then(response => {
          state.action = {
            engine: 'google',
            ms: (new Date() - ms),
            entity: entities.knowledge,
            value: response.text,
          };
          resolve(state);
        })
        .catch(reject);
    } else {
      resolve(state);
    }
  });
};
