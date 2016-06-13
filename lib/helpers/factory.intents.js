'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state) {
  return new Promise(function (resolve, reject) {
    state.actions = [];
    // -- @TODO: This execute all intents, how can we wait for the first successful one?
    var intents = state.intents.map(function (intent) {
      return intent.script(state, intent);
    });
    Promise.all(intents).then(function (state) {
      return resolve(state);
    }).catch(function (error) {
      return reject(error);
    });
  });
};