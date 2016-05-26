'use strict';

import Hope from 'hope';
import speak from 'speakeasy-nlp';
// -- Internal

const Adaptor = (text) => {
  let promise = new Hope.Promise();
  console.log('<SpeakEasy>', speak.classify(text));
  promise.done(null, text);
  return promise;
}

export default Adaptor;
