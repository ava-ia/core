'use strict';

import Hope from 'hope';
import cld from 'cld';
// -- Internal
const DEFAULT_VALUE = { name: 'ENGLISH', code: 'EN', percent: 0, score: 0 };

export default (request) => {
  let promise = new Hope.Promise();

  cld.detect(request.sentence, (error, value) => {
    request.language = !error ? value.languages[0] : DEFAULT_VALUE;
    console.log('  <language>', request.language);
    promise.done(undefined, request);
  });

  return promise;
};
