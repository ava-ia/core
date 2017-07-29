'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (state) {
  return new _promise2.default(function (resolve) {
    _cld2.default.detect(state.rawSentence, function (error, value) {
      if (!error) {
        state.language = value.languages[0].code;
      }
      state.sentence = state.rawSentence;

      resolve(state);
    });
  });
};

var _cld = require('cld');

var _cld2 = _interopRequireDefault(_cld);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }