'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _worldCountries = require('world-countries');

var _worldCountries2 = _interopRequireDefault(_worldCountries);

var _nlp_compromise = require('nlp_compromise');

var _nlp_compromise2 = _interopRequireDefault(_nlp_compromise);

var _googleTranslateApi = require('google-translate-api');

var _googleTranslateApi2 = _interopRequireDefault(_googleTranslateApi);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var RELATIONS = ['when', 'location'];
var DEMONYM = 'Demonym';
var PREPOSITION = 'Preposition';

exports.default = function (state) {

  return new Promise(function (resolve, reject) {
    var action_index = state.tokens.indexOf('translate');
    var terms = _nlp_compromise2.default.text(state.sentence).sentences[0].terms;
    var ms = new Date();
    var to = void 0;
    var sentence = '';

    terms.map(function (term, index) {
      if (index > action_index) {
        if (term.tag === DEMONYM) {
          (function () {
            var demonym = term.text.toLowerCase();
            var country = _worldCountries2.default.find(function (country) {
              return country.demonym.toLowerCase() === demonym;
            });
            if (country) to = country.cca2;
          })();
        } else if (!(term.tag === PREPOSITION && terms[index + 1].tag === DEMONYM)) {
          sentence += term.text + ' ';
        }
      }
    });

    if (state.debug) console.log('ActionTranslator'.bold.yellow, 'sentence:'.bold, sentence, 'to:'.bold, to);
    if (sentence && to) {
      (0, _googleTranslateApi2.default)(sentence, { to: to }).then(function (response) {
        state.action = {
          engine: 'translator',
          ms: new Date() - ms,
          entity: _helpers.entities.knowledge,
          value: response.text
        };
        resolve(state);
      });
    } else {
      resolve(state);
    }
  });
};