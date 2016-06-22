'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../helpers');

// -- Internal
var TERMS = ['weather', 'umbrella', 'rain', 'forecast', 'snow', 'fog', 'sun', 'cloud', 'meteo'];

exports.default = function (state, actions) {
  var tokens = (0, _helpers.intersect)(TERMS, state.tokens);
  var classifiers = (0, _helpers.intersect)(TERMS, state.classifier.categories);
  console.log('IntentWeather'.bold.green, 'tokens: ' + tokens.toString().green + ', classifiers: ' + classifiers.toString().green);

  if (tokens || classifiers) {
    return (0, _helpers.factoryActions)(state, actions);
  } else {
    return (0, _helpers.resolve)(state);
  }
};