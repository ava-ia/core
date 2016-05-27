'use strict';

import Hope from 'hope';
import cld from 'cld';
// -- Internal
const DEFAULT_VALUE = { name: 'ENGLISH', code: 'en', percent: 0, score: 0 };

export default (request, ava) => {
  let promise = new Hope.Promise();
  ava.step();

  const time = new Date();
  cld.detect(request.sentence, (error, value) => {
    // request.language = !error ? value.languages[0] : DEFAULT_VALUE;
    if (!error) request.language =  value.languages[0];
    request.language.ms = new Date() - time;
    promise.done(undefined, request);
  });

  return promise;
};
