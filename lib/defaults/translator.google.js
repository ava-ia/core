'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _googleTranslateApi = require('google-translate-api');

var _googleTranslateApi2 = _interopRequireDefault(_googleTranslateApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var LANGUAGE = 'en';

exports.default = function (state) {
  return new Promise(function (resolve, reject) {
    if (state.language.iso === LANGUAGE) return resolve(state);

    var time = new Date();
    (0, _googleTranslateApi2.default)(state.rawSentence, { from: state.language.iso, to: LANGUAGE }).then(function (response) {
      state.language = {
        engine: 'google',
        ms: new Date() - time,
        iso: response.from.language.iso
      };
      state.sentence = response.text;
      resolve(state);
    }).catch(function (error) {
      reject(error);
    });
  });
};