'use strict';

import cld from 'cld';
// -- Internal
const DEFAULT_VALUE = { name: 'ENGLISH', code: 'en', percent: 0, score: 0 };

export default (request, ava) => {
  return new Promise((resolve, reject) => {
    ava.step();

    const time = new Date();
    cld.detect(request.sentence, (error, value) => {
      // request.language = !error ? value.languages[0] : DEFAULT_VALUE;
      if (!error) request.language =  value.languages[0];
      request.language.ms = new Date() - time;
      resolve(request);
    });
  });
};
