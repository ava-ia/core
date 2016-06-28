'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../helpers');

// -- Internal
var RULES = ['how much is [value] [currency] [preposition] [currency]', 'convert [value] [currency] [preposition] [currency]'];

exports.default = function (state, actions) {
  var match = (0, _helpers.syntax)(state.sentence, RULES);
  if (state.debug) console.log('IntentConversor'.bold.green, 'match:'.bold, match);

  return match ? (0, _helpers.factoryActions)(state, actions) : (0, _helpers.resolve)(state);
};