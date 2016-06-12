'use strict';

export default (state) => {
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
