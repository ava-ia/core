'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

exports.default = function (state) {
  return {
    listen: function listen(sentence) {
      return new Promise(function (resolve, reject) {
        state.rawSentence = sentence;

        var factory = (0, _helpers.composeAsync)(_helpers.factoryComposers, _helpers.factoryIntents);
        factory(state).then(function (value) {
          state.actions.length > 0 ? resolve(state) : reject(new Error('No actions'));
        }).catch(function (error) {
          if (!error) error = { code: 0, message: "Sorry, I haven't understood you" };
          reject(error);
        });
      });
    }
  };
};