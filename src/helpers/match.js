'use strict';

import Compromise from 'nlp_compromise';

export default (sentence, rule) => {
  const rootSentence = Compromise.text(sentence).root();
  const matches = Compromise.text(rootSentence).match(rule);
  let match;

  if (matches.length > 0 && matches[0] !== null) match = matches[0].text()

  return (match);
};
