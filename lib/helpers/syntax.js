'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nlp_compromise = require('nlp_compromise');

var _nlp_compromise2 = _interopRequireDefault(_nlp_compromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regex = /\[(.*?)\]/g;

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

      var matches = _nlp_compromise2.default.text(rootSentence).match(rule);

      if (matches.length > 0 && matches[0] !== null) {
        var _ret = function () {
          var terms = matches[0].terms;
          var values = {};
          var keys = rule.match(regex);
          if (keys) {
            keys.map(function (key) {
              key = key.slice(1, -1).toLowerCase();
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = terms[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var term = _step2.value;

                  if (term.tag.toLowerCase() === key) {
                    if (!values[key]) {
                      values[key] = term.text;
                      break;
                    } else {
                      if (!Array.isArray(values[key])) values[key] = [values[key]];
                      if (values[key].indexOf(term.text) === -1) {
                        values[key].push(term.text);
                        break;
                      }
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
            });
          }

          match = Object.keys(values).length > 0 ? values : matches[0].text();
          return 'break';
        }();

        if (_ret === 'break') break;
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