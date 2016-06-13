'use strict';

export default (state, actions) => {
  return new Promise( (resolve, reject) => {
    // -- @TODO: This execute all actions, how can we wait for the first successful one?
    const promises = actions.map( (action) => action.call(null, state) );
    Promise.race(promises)
      .then( value => resolve(state) )
      .catch( error => reject(error) );
  });
}
