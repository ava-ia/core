// -- More Info: https://github.com/nlp-compromise/nlp_compromise
'use strict';

import Compromise from 'nlp_compromise';
// -- Internal

export default (phrase, ava) => {
  const time = new Date();
  const nlp = Compromise.text(phrase);
  let relations = {};
  nlp.sentences[0].terms.map((term) => {
    let key = (term.pos.Verb ? 'verb' : term.tag).toLowerCase();
    relations[key] = {
      text: term.text,
      info: term.pos,
      tag: term.tag
    }
  });
  return new Promise((resolve, reject) => {
    resolve({
      ms: (new Date() - time),
      relations: relations
    });
  });
};
