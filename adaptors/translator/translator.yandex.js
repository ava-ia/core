'use strict';

import Linguist from 'linguist';
// -- Internal
const LANGUAGE = 'en';

export default (phrase, fromLanguage, ava) => {
  return new Promise((resolve, reject) => {
    ava.step();

    const time = new Date();
    Linguist.translate(phrase, fromLanguage || LANGUAGE, LANGUAGE, (response) => {
      resolve({
        engine: 'yandex',
        iso: response.lang,
        phrase: response.text[0],
        ms: (new Date() - time)
      });
    });
  })
}
