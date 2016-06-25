'use strict';

import Compromise from 'nlp_compromise';

export default (sentence, rules) => {
  if (!Array.isArray(rules)) rules = [rules];
  let match;
  const rootSentence = Compromise.text(sentence).root();

  rules.map( rule => {
    const matches = Compromise.text(rootSentence).match(rule);
    if (matches.length > 0 && matches[0] !== null) match = matches[0].text()
  });

  return (match);
};
