'use strict';

import Salient from 'salient';
// -- Internal
const tokenizer = new Salient.tokenizers.RegExpTokenizer({ pattern: /\W+/ });
const glossary = new Salient.glossary.Glossary();
const analyser = new Salient.sentiment.BayesSentimentAnalyser();

export default (state) => {
  glossary.parse(state.sentence);

  state.nlp.concepts =  glossary.concepts();
  // state.nlp.glossary = glossary.toJSON();
  state.nlp.sentiment = analyser.classify(state.sentence);
  state.nlp.tokens = tokenizer.tokenize(state.sentence);

  return(state);
};
