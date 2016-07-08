'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nlp_compromise = require('nlp_compromise');

var _nlp_compromise2 = _interopRequireDefault(_nlp_compromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sentence, rules) {
  if (!Array.isArray(rules)) rules = [rules];
  var match = void 0;
  var rootSentence = _nlp_compromise2.default.text(sentence).root();

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var rule = _step.value;

      var matches = _nlp_compromise2.default.text(sentence).match(rule);

      if (matches.length > 0 && matches[0] !== null) {
        var values = {};

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = matches[0].terms[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var term = _step2.value;

            var key = term.tag.toLowerCase();
            var text = key !== 'symbol' ? _nlp_compromise2.default.text(term.text).root() : term.text;

            if (!values[key]) {
              values[key] = text;
            } else {
              if (!Array.isArray(values[key])) values[key] = [values[key]];
              if (values[key].indexOf(text) === -1) {
                values[key].push(text);
              }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        match = Object.keys(values).length > 0 ? values : matches[0].text();
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return match;
};