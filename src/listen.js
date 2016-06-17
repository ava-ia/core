'use strict';

import { composeAsync, factoryComposers, factoryIntents, timeout } from './helpers'

export default (state) => ({
  listen: (sentence) => {
    return new Promise( (resolve, reject) => {
      state.rawSentence = sentence;

      timeout(reject);
      const factory = composeAsync(factoryComposers, factoryIntents);

      factory(state)
        .then( value => {
          state.action ? resolve(state) : reject(new Error('No action'))
        })
        .catch ( error => {
          if (!error) error = { code: 0, message: "Sorry, I haven't understood you" };
          reject(error);
        })
    });
  }
})
