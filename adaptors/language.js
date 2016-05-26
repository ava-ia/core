'use strict';

import Hope from 'hope';
import cld from 'cld';
// -- Internal
import Ava from '../modules/ava';
const DEFAULT_VALUE = { name: 'ENGLISH', code: 'en', percent: 0, score: 0 };

export default (request) => {
  let promise = new Hope.Promise();
  Ava.searching();

  const time = new Date();
  cld.detect(request.sentence, (error, value) => {
    request.language = !error ? value.languages[0] : DEFAULT_VALUE;
    request.language.ms = new Date() - time;
    promise.done(undefined, request);
  });

  return promise;
};
