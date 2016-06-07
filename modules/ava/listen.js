'use strict';

import { FactoryComposers, FactoryIntents } from 'modules/ava/factories'

export default (state) => ({
  listen: (sentence) => {
    return new Promise(async (resolve, reject) => {
      try {
        state.rawSentence = sentence;
        state.response = {};
        await FactoryComposers(state);
        await FactoryIntents(state);
        // -- @TODO: Actions must be outside??
        // await FactoryActions(state);
        state.actions.length > 0 ? resolve(state) : reject()

      } catch (error) {
        reject(error);
      }
    });
  }
})
