'use strict';

import Salient from 'salient';
// -- Internal
const tokenizer = new Salient.tokenizers.RegExpTokenizer({ pattern: /\W+/ });
// const glossary = new Salient.glossary.Glossary();
const analyser = new Salient.sentiment.BayesSentimentAnalyser();

export default (request, ava) => {
  return new Promise((resolve, reject) => {
    const time = new Date();
    request.nlp = {
      engine: 'salient',
      tokens: tokenizer.tokenize(request.sentence),
      // glossary: glossary.parse(request.sentence),
      sentiment: analyser.classify(request.sentence),
      ms: (new Date() - time)
    };
    resolve(request);
  });
};
