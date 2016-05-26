'use strict';

import Hope from 'hope';
import Linguist from 'linguist';
// -- Internal
import Ava from '../modules/ava';
const LANGUAGE = 'en';

export default (request) => {
  let promise = new Hope.Promise();
  Ava.searching();

  if (request.language.code === LANGUAGE) {
    promise.done(null, request);
  } else {
    const time = new Date();
    Linguist.translate(request.sentence, request.language.code, LANGUAGE, (response) => {
      request.sentence = response.text[0];
      request.translator.yandex = {lang: response.lang, sentence: response.text[0], ms: (new Date() - time)};
      promise.done(null, request);
    });
  }

  return promise;
}
