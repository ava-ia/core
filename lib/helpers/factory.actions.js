'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, actions) {
  return new Promise(function (resolve, reject) {
    // -- @TODO: This execute all actions, how can we wait for the first successful one?
    var promises = actions.map(function (action) {
      return action.call(null, state);
    });
    Promise.race(promises).then(function (value) {
      return resolve(state);
    }).catch(function (error) {
      return reject(error);
    });
  });
};