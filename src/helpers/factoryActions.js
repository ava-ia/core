'use strict';

export default async (state, actions) => {
  const promises = actions.map( (action) => action.call(null, state) );

  return await Promise.race(promises);
}
