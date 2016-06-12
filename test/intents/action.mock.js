'use strict';

import { Constants } from 'ava'

export default (state) => {

  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      state.actions.push({
        engine: 'mock',
        ms: 10,
        type: Constants.action.type.rich
      });

      resolve(state);
    }, 10)
  })

}
