'use strict';

import Linguist from 'linguist';
// -- Internal
const LANGUAGE = 'en';

export default (state) => {
  return new Promise((resolve, reject) => {
    if (state.language.iso === LANGUAGE) return resolve(state);

    const time = new Date();
    Linguist.translate(state.rawSentence, state.language.iso || LANGUAGE, LANGUAGE, (response) => {
      state.language = {
        engine: 'yandex',
        ms: (new Date() - time),
        iso: response.lang,
      };
      state.sentence = response.text[0];
      resolve(state);
    });
  })
}
