'use strict';

import pkg from '../package.json';
// -- Functions
import intent from './intent';
import listen from './listen';

export default (props = {}) => {

  let state = {
    version: pkg.version,
    intents: []
  }

  return Object.assign(
    {},
    intent(state),
    listen(state),
  )
}
