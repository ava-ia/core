'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../helpers');

var _language = require('./language');

var _language2 = _interopRequireDefault(_language);

var _translator = require('./translator');

var _translator2 = _interopRequireDefault(_translator);

var _classifier = require('./classifier');

var _classifier2 = _interopRequireDefault(_classifier);

var _compromise = require('./compromise');

var _compromise2 = _interopRequireDefault(_compromise);

var _taxonomy = require('./taxonomy');

var _taxonomy2 = _interopRequireDefault(_taxonomy);

var _relations = require('./relations');

var _relations2 = _interopRequireDefault(_relations);

var _sentiment = require('./sentiment');

var _sentiment2 = _interopRequireDefault(_sentiment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state) {
  var factory = (0, _helpers.composeAsync)(_language2.default, _translator2.default, _taxonomy2.default, _classifier2.default, _compromise2.default, _relations2.default, _sentiment2.default);

  return factory(state);
};