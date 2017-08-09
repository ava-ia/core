import { isFunction } from './modules';

export default state => ({

  intent(script, actions = []) {
    if (isFunction(actions)) actions = [actions];
    if (isFunction(script) && Array.isArray(actions)) state.intents.push({ script, actions });

    return this;
  },
});
