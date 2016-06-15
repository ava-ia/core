'use strict';

export default (state) => {
  return new Promise( (resolve, reject) => {
    state.action = undefined;
    // -- @TODO: This execute all intents, how can we wait for the first successful one?
    const intents = state.intents.map( (intent) => intent.script(state, intent) );
    Promise.all(intents)
      .then( state => resolve(state) )
      .catch( error => reject(error) )
  });
}
