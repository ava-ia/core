// -- More info: https://github.com/ttezel/bayes
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bayes = require('bayes');

var _bayes2 = _interopRequireDefault(_bayes);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var db = (0, _helpers.store)('classifier.json');
var classifierForLanguage = function classifierForLanguage(language) {
  var value = db.get(language).value();
  return value ? _bayes2.default.fromJson(value) : (0, _bayes2.default)();
};

exports.default = function (state) {
  var classifier = classifierForLanguage(state.language);
  var categories = classifier.categorize(state.rawSentence);

  if (state.taxonomy && state.taxonomy !== categories) {
    classifier.learn(state.rawSentence, state.taxonomy);
    db.set(state.language, classifier.toJson()).value();
    categories = state.taxonomy;
  }
  state.classifier = categories ? categories.split('/') : [];

  return state;
};