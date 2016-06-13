'use strict';

import { composeAsync, factoryComposers, factoryIntents } from './helpers'

export default (state) => ({
  listen: (sentence) => {
    return new Promise( (resolve, reject) => {
      state.rawSentence = sentence;

      const factory = composeAsync(factoryComposers, factoryIntents);
      factory(state)
        .then( value => {
          state.actions.length > 0 ? resolve(state) : reject(new Error('No actions'))
        })
        .catch ( error => {
          if (!error) error = {code: 0, message: "Sorry, I haven't understood you"};
          reject(error);
        })
    });
  }
})
