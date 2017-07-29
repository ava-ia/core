'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SYNTAXES = ['. [Value] [Preposition] [Value]', '[Value] . [Preposition] [Value]', '[Value][Symbol][Value]', '[Value] . [Value]'];

var OPERATIONS = [{ calc: function calc(a, b) {
    return a + b;
  }, terms: ['+', 'plus', 'add'] }, { calc: function calc(a, b) {
    return a - b;
  }, terms: ['-', 'minu', 'subtract'] }, { calc: function calc(a, b) {
    return a * b;
  }, terms: ['*', 'multiply'] }, { calc: function calc(a, b) {
    return a / b;
  }, terms: ['/', 'divided', 'divides'] }];

exports.default = function (state) {
  var ms = new Date();
  var match = (0, _helpers.syntax)(state.sentence, SYNTAXES);
  if (!match) return (0, _helpers.resolve)(state);
  var operation = match.noun || match.conjunction || match.infinitive || match.symbol;
  var a = parseFloat(match.value[0]);
  var b = parseFloat(match.value[1]);

  if (state.debug) {
    console.log('ActionMath'.bold.yellow, 'operation:'.bold, operation, 'a:'.bold, a, 'b:'.bold, b);
  }

  if (operation && a && b) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(OPERATIONS), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var type = _step.value;

        if (type.terms.indexOf(operation) > -1) {
          var value = type.calc(a, b);
          state.action = {
            ms: new Date() - ms,
            engine: 'ava',
            title: 'It\'s ' + value,
            value: value,
            entity: _helpers.entities.number
          };

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
  }

  return (0, _helpers.resolve)(state);
};