'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};

exports.default = function (state) {
  return {
    intent: function intent(script, actions) {
      if (isFunction(actions)) actions = [actions];

      if (isFunction(script) && Array.isArray(actions)) {
        state.intents.push({ script: script, actions: actions });
      }

      return this;
    }
  };
};