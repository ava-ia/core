'use strict';

import { FactoryComposers, FactoryIntents } from 'modules/ava/factories'

export default (state) => ({
  listen: (sentence) => {
    return new Promise(async (resolve, reject) => {
      try {
        state.rawSentence = sentence;
        await FactoryComposers(state);
        await FactoryIntents(state);
        resolve(state);

      } catch (error) {
        console.log('listen.catch')
        reject(error);
      }
    });
  }
})
