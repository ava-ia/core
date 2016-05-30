// -- More Info: https://github.com/nlp-compromise/nlp_compromise
'use strict';

import Compromise from 'nlp_compromise';
import Chrono from 'chrono-node';
// -- Internal

export default (phrase, ava) => {
  const time = new Date();
  const nlp = Compromise.text(phrase);
  let relations = {};
  nlp.sentences[0].terms.map((term) => {
    let key = (term.pos.Verb ? 'verb' : term.tag).toLowerCase();
    relations[key] = {
      raw: term.text,
      value: (key === 'date' ? Chrono.parseDate(term.text) : term.normal).toString(),
      info: term.pos,
      tag: term.tag
    }
  });
  return new Promise((resolve, reject) => {
    resolve({
      engine: 'compromise',
      ms: (new Date() - time),

      relations: relations
    });
  });
};
