'use strict';

import GoogleTranslate from 'google-translate-api';
// -- Internal
const LANGUAGE = 'en';

export default (state) => {
  return new Promise((resolve, reject) => {
    if (state.language.iso === LANGUAGE) return resolve(state);

    const time = new Date();
    GoogleTranslate(state.rawSentence, {from: state.language.iso, to: LANGUAGE}).then(response => {
      state.language = {
        engine: 'google',
        ms: (new Date() - time),
        iso: response.from.language.iso,
      };
      state.sentence = response.text;
      resolve(state);

    }).catch(error => {
      reject(error);
    });
  })
}
