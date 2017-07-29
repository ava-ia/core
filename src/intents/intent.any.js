import { factoryActions } from '../helpers';

export default (state, actions) => {
  if (state.debug) console.log('IntentAny'.bold.green);

  return factoryActions(state, actions);
};
