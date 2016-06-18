'use strict';
import constants from '../constants'

export default (state, request) => {
  state.action = { type: constants.action.type.request, request: request};

  return state;
}
