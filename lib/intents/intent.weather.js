'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../helpers');

// -- Internal
var TERMS = ['weather', 'umbrella', 'rain', 'forecast', 'snow', 'fog', 'sun', 'cloud', 'meteo'];

exports.default = function (state, actions) {
  var tokens = (0, _helpers.intersect)(TERMS, state.tokens);
  var classifiers = (0, _helpers.intersect)(TERMS, state.classifier);
  if (state.debug) {
    console.log('IntentWeather'.bold.green, 'tokens: ' + tokens.toString().green + ', classifiers: ' + classifiers.toString().green);
  }

  return tokens || classifiers ? (0, _helpers.factoryActions)(state, actions) : (0, _helpers.resolve)(state);
};