'use strict';

import cld from 'cld';

export default (state) => {
  return new Promise((resolve, reject) => {

    cld.detect(state.rawSentence, (error, value) => {
      const time = new Date();
      let language = {};

      if (!error) {
        language = {
          engine: 'cld',
          ms: new Date() - time,

          iso: value.languages[0].code,
          percent: value.languages[0].percent,
        };
      }
      state.language = language;
      state.sentence = state.rawSentence;

      resolve(state);
    });
  });
};
