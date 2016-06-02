// -- More Info: https://github.com/nlp-compromise/nlp_compromise
'use strict';

import Compromise from 'nlp_compromise';
// -- Internal
let lexicon = Compromise.lexicon()
lexicon['ava'] = 'Person';

export default (phrase) => {
  const time = new Date();
  const root_phrase = Compromise.text(phrase).root();

  return new Promise((resolve, reject) => {
    resolve({
      engine: 'compromise',
      ms: (new Date() - time),

      sentences: Compromise.text(root_phrase, {lexicon:lexicon}).sentences,
      type: Compromise.sentence(phrase).sentence_type(),
      topics: Compromise.text(phrase).topics()
    });
  });
};
