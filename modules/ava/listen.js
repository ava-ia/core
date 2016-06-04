'use strict';

import { FactoryComposer } from 'modules/ava/factories'

export default (state) => ({
  listen: (sentence) => {
    return new Promise(async (resolve, reject) => {
      try {
        state.rawSentence = sentence;

        await FactoryComposer(state);

        state.actions = [];
        const intent = state.intents[0];
        await intent.script(state, intent);

        // -- @TODO: Iterate over all intents
        // state.intents.map(async (intent) => {
        //   await intent.script.call(null, state, intent.action);
        // });

        resolve(state);

      } catch (error) {
        console.log('listen.catch')
        reject(error);
      }
    });
  }
})
