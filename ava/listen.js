'use strict';

import { FactoryComposers, FactoryIntents } from './factories'

export default (state) => ({
  listen: (sentence) => {
    return new Promise(async (resolve, reject) => {
      try {
        state.rawSentence = sentence;

        await FactoryComposers(state);
        if (state.intents.length > 0) await FactoryIntents(state);
        // -- @TODO: Actions must be outside??
        // await FactoryActions(state);

        state.actions.length > 0 ? resolve(state) : reject(state)

      } catch (error) {
        reject(error);
      }
    });
  }
})
