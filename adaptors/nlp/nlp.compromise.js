// -- More Info: https://github.com/nlp-compromise/nlp_compromise
'use strict';

import Compromise from 'nlp_compromise';
// -- Internals
import relations from './modules/relations'

export default (phrase, ava) => {
  const time = new Date();
  // phrase = Compromise.text(phrase).contractions.expand();
  // console.log('phrase', phrase);
  // let t = Compromise.text(phrase);
  // console.log(t.normal(), t.root());

  let lexicon = Compromise.lexicon()
  lexicon['ava'] = 'Person';

  const nlp = Compromise.text(phrase, {lexicon:lexicon});

  return new Promise((resolve, reject) => {
    resolve({
      engine: 'compromise',
      ms: (new Date() - time),

      relations: relations(nlp.sentences[0].terms),
      type: Compromise.sentence(phrase).sentence_type(),
      topics: Compromise.text(phrase).topics()
    });
  });
};
