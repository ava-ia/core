'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sentiment = require('sentiment');

var _sentiment2 = _interopRequireDefault(_sentiment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state) {
  var sentence = (0, _sentiment2.default)(state.sentence.toLowerCase());
  state.sentiment = sentence.score;

  return state;
};