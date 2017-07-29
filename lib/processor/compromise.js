'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nlp_compromise = require('nlp_compromise');

var _nlp_compromise2 = _interopRequireDefault(_nlp_compromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state) {
  var compromise = _nlp_compromise2.default.text(state.sentence);

  state.type = _nlp_compromise2.default.sentence(state.sentence).sentence_type();
  state.topics = compromise.topics().map(function (topic) {
    return topic.text;
  });
  state.tags = compromise.tags()[0];

  return state;
};