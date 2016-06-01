'use strict';

import cld from 'cld';
// -- Internal
const DEFAULT_VALUE = { name: 'ENGLISH', code: 'en', percent: 0, score: 0 };

export default (phrase) => {
  return new Promise((resolve, reject) => {

    const time = new Date();
    cld.detect(phrase, (error, value) => {
      let response = {};
      if (!error) {
        const language = value.languages[0]
        response = {
          iso: language.code,
          percent: language.percent,
          ms: new Date() - time
        };
      }
      resolve(response);
    });
  });
};
