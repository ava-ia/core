'use strict';

import GoogleTranslate from 'google-translate-api';
// -- Internal
const LANGUAGE = 'en';

export default (request, ava) => {
  return new Promise((resolve, reject) => {
    ava.step();

    if (request.language.code === LANGUAGE) {
      resolve(request);
    } else {
      const time = new Date();
      GoogleTranslate(request.sentence, {from: request.language.code, to: LANGUAGE}).then(response => {
        request.sentence = response.text;
        request.translator = {
          engine: 'google',
          language: response.from.language.iso,
          sentence: response.text,
          ms: (new Date() - time)
        };
        resolve(request);
      }).catch(error => {
        reject(error);
      });
    }
  })
}
