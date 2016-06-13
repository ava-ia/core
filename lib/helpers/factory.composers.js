'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _composeAsync = require('./composeAsync');

var _composeAsync2 = _interopRequireDefault(_composeAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state) {
  var _state$composer = state.composer;
  var language = _state$composer.language;
  var translator = _state$composer.translator;
  var classifier = _state$composer.classifier;
  var nlp = _state$composer.nlp;

  var factory = (0, _composeAsync2.default)(language, translator, nlp, classifier);

  return new Promise(function (resolve, reject) {
    factory(state).then(function (state) {
      return resolve(state);
    }).catch(function (error) {
      return reject(error);
    });
  });
};