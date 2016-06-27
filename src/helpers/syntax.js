'use strict';

import Compromise from 'nlp_compromise';
const regex = /\[(.*?)\]/g;

export default (sentence, rules) => {
  if (!Array.isArray(rules)) rules = [rules];
  let match;
  const rootSentence = Compromise.text(sentence).root();

  for (const rule of rules) {
    const matches = Compromise.text(rootSentence).match(rule);

    if (matches.length > 0 && matches[0] !== null) {
      const terms = matches[0].terms;
      let values = [];

      let keys = rule.match(regex).map( key => {
        key = key.slice(1, -1).toLowerCase();
        for (const term of terms) {
          if ( term.tag.toLowerCase() === key && values.indexOf(term.text) === -1) {
            values.push(term.text);
            break;
          }
        }
      });
      match = values.length > 0 ? values : matches[0].text();
      break;
    }
  }

  return (match);
};
