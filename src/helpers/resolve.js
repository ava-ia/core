'use strict';

export default (state) => new Promise( (resolve, reject) => {
  if (state.intents && state.intents.length === 1) resolve(state);
});
