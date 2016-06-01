// -- More info: https://github.com/NaturalNode/natural
'use strict';

import Natural from 'natural';
// -- Internal
const tokenizer = new Natural.WordTokenizer()

export default (phrase) => {
  const time = new Date();
  return new Promise((resolve, reject) => {
    const tokens = tokenizer.tokenize(phrase);
    tokens.map(token => {
      console.log(token, Natural.PorterStemmer.stem(token))
    });

    Natural.LancasterStemmer.attach();
    console.log(phrase.tokenizeAndStem());

    resolve({
      engine: 'compromise',
      ms: (new Date() - time),

      tokens: tokenizer.tokenize(phrase),
      stemmers: Natural.PorterStemmer.stem(phrase)
      // glossary: glossary.parse(phrase),
      // sentiment: analyser.classify(phrase),
    });
  });
};
