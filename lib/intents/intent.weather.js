'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../helpers');

// -- Internal
var TERMS = ['weather', 'umbrella', 'rain', 'forecast', 'snow', 'fog', 'sun', 'cloud', 'meteo'];

exports.default = function (state, intent) {

  return new Promise(function (resolve, reject) {
    var tokens = (0, _helpers.intersect)(TERMS, state.nlp.tokens);
    var classifiers = (0, _helpers.intersect)(TERMS, state.classifier.categories);
    console.log('IntentWeather'.bold.green, 'tokens: ' + tokens.toString().green + ', classifiers: ' + classifiers.toString().green);

    if (tokens || classifiers) {
      (0, _helpers.factoryActions)(state, intent.actions).then(function (state) {
        return resolve(state);
      }).catch(function (error) {
        return reject(error);
      });
    } else {
      reject();
    }
  });
};