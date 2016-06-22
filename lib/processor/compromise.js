// -- More Info: https://github.com/nlp-compromise/nlp_compromise
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nlp_compromise = require('nlp_compromise');

var _nlp_compromise2 = _interopRequireDefault(_nlp_compromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state) {

  state.type = _nlp_compromise2.default.sentence(state.sentence).sentence_type();
  state.topics = _nlp_compromise2.default.text(state.sentence).topics();

  return state;
};