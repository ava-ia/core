'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state) {
  return new Promise(function (resolve, reject) {
    if (state.intents && state.intents.length === 1) resolve(state);
  });
};