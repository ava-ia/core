import entities from './entities';

export default (state, request) => {
  state.action = { entity: entities.request, request };

  return state;
};
