'use strict';

import sentiment from 'sentiment';

export default (state) => {
  const sentence = sentiment(state.sentence.toLowerCase());
  state.nlp.sentiment = sentence.score;
  state.nlp.tokens = sentence.tokens;

  return(state);
};
