'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cld = require('cld');

var _cld2 = _interopRequireDefault(_cld);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state) {
  return new Promise(function (resolve, reject) {

    _cld2.default.detect(state.rawSentence, function (error, value) {
      var time = new Date();
      var language = {};

      if (!error) {
        language = {
          engine: 'cld',
          ms: new Date() - time,

          iso: value.languages[0].code,
          percent: value.languages[0].percent
        };
      }
      state.language = language;
      state.sentence = state.rawSentence;

      resolve(state);
    });
  });
};