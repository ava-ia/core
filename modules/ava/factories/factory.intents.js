'use strict';

import composeAsync from 'modules/composeAsync'

export default (state) => {
  const factory = composeAsync();

  return new Promise( async (resolve, reject) => {
    state.actions = [];
    // -- @TODO: Iterate over all intents
    const intent = state.intents[0];
    await intent.script(state, intent);
    resolve(state);
  });
}
