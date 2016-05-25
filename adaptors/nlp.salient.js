'use strict';

import Hope from 'hope';
import Salient from 'salient';
// -- Internal
const tokenizer = new Salient.tokenizers.RegExpTokenizer({ pattern: /\W+/ });
const glossary = new Salient.glossary.Glossary();
const analyser = new Salient.sentiment.BayesSentimentAnalyser();

export default (request) => {
  let promise = new Hope.Promise();

  request.nlp.salient = {
    tokens: tokenizer.tokenize(request.sentence),
    glossary: glossary.parse(request.sentence),
    sentiment: analyser.classify(request.sentence)
  };
  console.log(`
  <salient>
    <tokens>${request.nlp.salient.tokens}
    <glossary>${request.nlp.salient.glossary}
    <sentiment>${request.nlp.salient.sentiment}
  </salient>`);
  promise.done(null, request);

  return promise;
};
