import { factoryActions, trace } from '../helpers';

export default (state, actions) => {
  trace('IntentAny', {}, state);

  return factoryActions(state, actions);
};
