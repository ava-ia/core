'use strict';

import Compromise from 'nlp_compromise';

export default (sentence, rules) => {
  if (!Array.isArray(rules)) rules = [rules];
  let match;
  const rootSentence = Compromise.text(sentence).root();

  for (const rule of rules) {
    const matches = Compromise.text(rootSentence).match(rule);

    if (matches.length > 0 && matches[0] !== null) {
      let values = {};

      for (const term of matches[0].terms) {
        const key = term.tag.toLowerCase();
        const text = Compromise.text(term.text).root()

        if (!values[key]) {
          values[key] = text;
        } else {
          if (!Array.isArray(values[key])) values[key] = [values[key]]
          if (values[key].indexOf(text) === -1) {
            values[key].push(text);
          }
        }
      }

      match = Object.keys(values).length > 0 ? values : matches[0].text();
      break;
    }
  }

  return (match);
};
