'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../helpers');

// -- Internal
var RULES = ['translate [Preposition]? [Demonym]', 'translate * [Preposition] [Demonym]'];

exports.default = function (state, actions) {
  var match = (0, _helpers.syntax)(state.sentence, RULES);
  if (state.debug) console.log('IntentTranslate'.bold.green, 'match:'.bold, match);

  return match ? (0, _helpers.factoryActions)(state, actions) : (0, _helpers.resolve)(state);
};