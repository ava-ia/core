'use strict';

import { composeAsync, factoryIntents, timeout } from './helpers'
import factoryProcessor from './processor'

export default (state) => ({
  listen: (sentence) => {
    return new Promise( (resolve, reject) => {
      state.rawSentence = sentence;

      timeout(reject);
      const factory = composeAsync(factoryProcessor, factoryIntents);

      factory(state).
        then( state => {
          state.action ? resolve(state) : reject(new Error('Unknown action'))
        }).
        catch ( error => {
          if (!error) error = { code: 0, message: "Sorry, I haven't understood you" };
          reject(error);
        })
    });
  }
})
