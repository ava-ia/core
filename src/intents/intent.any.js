'use strict';

import { factoryActions } from '../helpers'

export default (state, actions) => {
  console.log('IntentAny'.bold.green);

  return factoryActions(state, actions)
};
