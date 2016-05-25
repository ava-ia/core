'use strict';

import Hope from 'hope';
import Linguist from 'linguist';
// -- Internal
const LANGUAGE = 'en';

export default (request) => {
  let promise = new Hope.Promise();

  if (request.language.code === LANGUAGE) {
    promise.done(null, request);
  } else {
    Linguist.translate(request.sentence, request.language.code, LANGUAGE, (response) => {
      request.sentence = response.text[0];
      request.translator.yandex = {lang: response.lang, sentence: response.text[0]};
      console.log('  <translator.yandex>', request.translator.yandex.lang);
      promise.done(null, request);
    });
  }

  return promise;
}
