// -- More Info: https://github.com/nlp-compromise/nlp_compromise
'use strict';

import Compromise from 'nlp_compromise';

export default (phrase) => {
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

      sentences: nlp.sentences,
      type: Compromise.sentence(phrase).sentence_type(),
      topics: Compromise.text(phrase).topics()
    });
  });
};
