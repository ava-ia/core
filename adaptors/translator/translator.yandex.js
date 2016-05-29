'use strict';

import Linguist from 'linguist';
// -- Internal
const LANGUAGE = 'en';

export default (request, ava) => {
  return new Promise((resolve, reject) => {
    ava.step();

    if (request.language.code === LANGUAGE) {
      resolve(request);
    } else {
      const time = new Date();
      Linguist.translate(request.sentence, request.language.code || LANGUAGE, LANGUAGE, (response) => {
        request.sentence = response.text[0];
        request.translator = {
          engine: 'yandex',
          language: response.lang,
          sentence: request.sentence,
          ms: (new Date() - time)
        };
        resolve(request);
      });
    }
  })
}
