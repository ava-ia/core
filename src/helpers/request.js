'use strict';
import entities from './entities'

export default (state, request) => {
  state.action = { entity: entities.request, request: request};

  return state;
}
