'use strict';

import { constants } from '../../src'

export default (state) => {

  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      state.action = {
        engine: 'mock',
        ms: 10,
        type: constants.action.type.rich
      };

      resolve(state);
    }, 10)
  })

}
