'use strict';

import Salient from 'salient';
// -- Internal
const tokenizer = new Salient.tokenizers.RegExpTokenizer({ pattern: /\W+/ });
// const glossary = new Salient.glossary.Glossary();
const analyser = new Salient.sentiment.BayesSentimentAnalyser();

export default (phrase, ava) => {
  const time = new Date();
  return new Promise((resolve, reject) => {
    resolve({
      engine: 'salient',
      tokens: tokenizer.tokenize(phrase),
      // glossary: glossary.parse(phrase),
      sentiment: analyser.classify(phrase),
      ms: (new Date() - time)
    });
  });
};
