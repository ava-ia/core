'use strict';

import cld from 'cld';
// -- Internal
const DEFAULT_VALUE = { name: 'ENGLISH', code: 'en', percent: 0, score: 0 };

export default (state) => {
  return new Promise((resolve, reject) => {

    const time = new Date();
    cld.detect(state.rawSentence, (error, value) => {
      let language = {};
      if (!error) {
        language = {
          iso: value.languages[0].code,
          percent: value.languages[0].percent,
          ms: new Date() - time
        };
      }
      state.language = language;
      state.sentence = state.rawSentence;

      resolve(state);
    });
  });
};
