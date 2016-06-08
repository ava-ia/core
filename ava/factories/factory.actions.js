'use strict';

export default (state, actions) => {
  return new Promise( async (resolve, reject) => {
    try {
      // -- @TODO: This execute all actions, how can we wait for the first successful one?
      const promises = actions.map( (action) => action.call(null, state) );
      await Promise.race(promises);
      resolve(state);

    } catch (error) {
      // -- @TODO: If it's rejected maybe is because already has actions
      reject(error);
    }
  });
}
