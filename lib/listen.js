'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state) {
  return {
    listen: function listen(sentence, ms) {
      return new Promise(function (resolve, reject) {
        state.rawSentence = sentence;

        if (ms) (0, _helpers.timeout)(reject, ms);
        var factory = (0, _helpers.composeAsync)(_processor2.default, _helpers.factoryIntents);

        factory(state).then(function (state) {
          state.action ? resolve(state) : reject(new Error('Unknown action'));
        }).catch(function (error) {
          if (!error) error = { code: 0, message: "Sorry, I haven't understood you" };
          reject(error);
        });
      });
    }
  };
};