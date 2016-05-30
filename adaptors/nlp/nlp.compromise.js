// -- More Info: https://github.com/nlp-compromise/nlp_compromise
'use strict';

import Compromise from 'nlp_compromise';
// -- Internals
import relations from './modules/relations'

export default (phrase, ava) => {
  const time = new Date();
  const nlp = Compromise.text(phrase);

  return new Promise((resolve, reject) => {
    resolve({
      engine: 'compromise',
      ms: (new Date() - time),

      relations: relations(nlp.sentences[0].terms)
    });
  });
};
