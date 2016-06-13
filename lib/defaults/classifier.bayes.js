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
var db = (0, _helpers.store)('classifier.bayes.json');
var classifierForLanguage = function classifierForLanguage(language) {
  var value = db.get(language).value();
  return value ? _bayes2.default.fromJson(value) : (0, _bayes2.default)();
};

exports.default = function (state) {
  var time = new Date();
  var classifier = classifierForLanguage(state.language.iso);
  var categories = classifier.categorize(state.rawSentence);

  if (state.nlp.taxonomy && state.nlp.taxonomy !== categories) {
    classifier.learn(state.rawSentence, state.nlp.taxonomy);
    db.set(state.language.iso, classifier.toJson()).value();
    categories = state.nlp.taxonomy;
  }

  state.classifier = {
    engine: 'bayes',
    ms: new Date() - time,
    categories: categories ? categories.split('/') : []
  };

  return state;
};