'use strict';

import { entities } from '../../src/helpers'

export default (state) => {

  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      state.action = {
        engine: 'mock',
        ms: 10,
        type: entities.knowledge
      };

      resolve(state);
    }, 10)
  })

}
