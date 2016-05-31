'use strict';

import Linguist from 'linguist';
// -- Internal
const LANGUAGE = 'en';

export default (phrase, fromLanguage) => {
  return new Promise((resolve, reject) => {

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
