'use strict';

const isFunction = (value) => (typeof(value) === 'function');

export default (state) => ({

  intent: function(script, actions) {
    if (isFunction(actions)) actions = [actions];

    if (isFunction(script) && Array.isArray(actions)) {
      state.intents.push({
        script: script,
        actions: actions
      });
    }

    return this;
  }
})
