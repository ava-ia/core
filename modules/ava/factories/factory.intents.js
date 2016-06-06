'use strict';

import composeAsync from 'modules/composeAsync'

export default (state) => {
  const factory = composeAsync();

  return new Promise( async (resolve, reject) => {
    try {
      state.actions = [];
      // -- @TODO: This execute all intents, how can we wait for the first successful one?
      const intents = state.intents.map( (intent) => intent.script(state, intent) );
      await Promise.all(intents);

      resolve(state);

    } catch (error) {
      // -- @TODO: If it's rejected maybe is because already has actions
      reject(error);
    }
  });
}
