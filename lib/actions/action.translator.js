'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (state) {
  return new _promise2.default(function (resolve, reject) {
    var actionIndex = state.tokens.indexOf('translate');
    var terms = _nlp_compromise2.default.text(state.sentence).sentences[0].terms;
    var ms = new Date();
    var to = void 0;
    var demonymIndex = void 0;
    var sentence = '';

    terms.forEach(function (term, index) {
      if (index > actionIndex) {
        if (term.tag === DEMONYM && demonymIndex === undefined) {
          var demonym = term.text.toLowerCase();
          var country = _worldCountries2.default.find(function (item) {
            return item.demonym.toLowerCase() === demonym;
          });

          if (country) {
            demonymIndex = index;
            to = country.cca2;
          }
        } else if (index > demonymIndex) {
          sentence += term.text + ' ';
        }
      }
    });

    if (state.debug) {
      console.log('ActionTranslator'.bold.yellow, 'sentence:'.bold, sentence, 'to:'.bold, to);
    }

    if (sentence && to) {
      (0, _googleTranslateApi2.default)(sentence, { to: to }).then(function (response) {
        state.action = {
          engine: 'google',
          ms: new Date() - ms,
          entity: _helpers.entities.knowledge,
          value: response.text
        };
        resolve(state);
      }).catch(reject);
    } else {
      resolve(state);
    }
  });
};

var _worldCountries = require('world-countries');

var _worldCountries2 = _interopRequireDefault(_worldCountries);

var _nlp_compromise = require('nlp_compromise');

var _nlp_compromise2 = _interopRequireDefault(_nlp_compromise);

var _googleTranslateApi = require('google-translate-api');

var _googleTranslateApi2 = _interopRequireDefault(_googleTranslateApi);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var DEMONYM = 'Demonym';