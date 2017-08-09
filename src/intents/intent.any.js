import { trace } from '../helpers';

export default (state) => {
  trace('IntentAny', {}, state);

  return true;
};
