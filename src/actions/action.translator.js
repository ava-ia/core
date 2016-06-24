'use strict';

import countries from 'world-countries';
import Compromise from 'nlp_compromise';
import GoogleTranslate from 'google-translate-api';
import constants from '../constants'
import { relation, request } from '../helpers'
// -- Internal
const RELATIONS = ['when', 'location'];
const DEMONYM = 'Demonym';
const PREPOSITION = 'Preposition';

export default (state) => {

  return new Promise((resolve, reject) => {
    // How can I say in italian i have hungry

    const action_index = state.tokens.indexOf('translate');
    const terms = Compromise.text(state.sentence).sentences[0].terms;
    const ms = new Date()
    let to;
    let sentence = '';

    terms.map( (term, index) => {
      if (index > action_index) {
        if (term.tag === DEMONYM) {
          const demonym = term.text.toLowerCase();
          const country = countries.find( country => country.demonym.toLowerCase() === demonym );
          if (country) to = country.cca2;
        } else if (!(term.tag === PREPOSITION && terms[index + 1].tag === DEMONYM)) {
          sentence += `${term.text} `
        }
      }
    })

    console.log('ActionTranslator'.bold.yellow, 'sentence:'.bold, sentence, 'to:'.bold,  to);
    if (sentence && to) {
      GoogleTranslate(sentence, {to}).then( response => {
        state.action = {
          engine: 'translator',
          ms: (new Date() - ms),
          type: constants.action.type.rich,

          value: response.text
        };
        resolve(state);
      });

    } else {
      resolve(state);
    }
  });
};
