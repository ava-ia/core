'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classifier = require('./classifier.bayes');

Object.defineProperty(exports, 'classifierBayes', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_classifier).default;
  }
});

var _language = require('./language.cld');

Object.defineProperty(exports, 'languageCLD', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_language).default;
  }
});

var _nlp = require('./nlp');

Object.defineProperty(exports, 'nlp', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nlp).default;
  }
});

var _translator = require('./translator.google');

Object.defineProperty(exports, 'translatorGoogle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_translator).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }