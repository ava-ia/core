'use strict';

import Salient from 'salient';
// -- Internal
const tokenizer = new Salient.tokenizers.RegExpTokenizer({ pattern: /\W+/ });
// const glossary = new Salient.glossary.Glossary();
const analyser = new Salient.sentiment.BayesSentimentAnalyser();

export default (phrase) => {
  const time = new Date();
  return new Promise((resolve, reject) => {
    resolve({
      engine: 'salient',
      ms: (new Date() - time),

      tokens: tokenizer.tokenize(phrase),
      // glossary: glossary.parse(phrase),
      sentiment: analyser.classify(phrase)
    });
  });
};
