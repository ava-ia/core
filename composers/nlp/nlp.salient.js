'use strict';

import Salient from 'salient';
// -- Internal
const tokenizer = new Salient.tokenizers.RegExpTokenizer({ pattern: /\W+/ });
const glossary = new Salient.glossary.Glossary();
const analyser = new Salient.sentiment.BayesSentimentAnalyser();

export default (phrase) => {
  const time = new Date();
  return new Promise((resolve, reject) => {
    glossary.parse(phrase);

    resolve({
      engine: 'salient',
      ms: (new Date() - time),

      concepts:  glossary.concepts(),
      glossary: glossary.toJSON(),
      sentiment: analyser.classify(phrase),
      tokens: tokenizer.tokenize(phrase),
    });
  });
};
