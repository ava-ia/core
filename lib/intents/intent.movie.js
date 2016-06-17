'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../helpers');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// -- Internal
var TERMS = ['film', 'movie', 'show', 'actor', 'director', 'camera', 'editor', 'cinema', 'tv', 'producer'];

exports.default = function (state, intent) {
  return new Promise(function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
      var tokens, classifiers;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokens = (0, _helpers.intersect)(TERMS, state.nlp.tokens);
              classifiers = (0, _helpers.intersect)(TERMS, state.classifier.categories);

              console.log('IntentMovie'.bold.green, 'tokens: ' + tokens.toString().green + ', classifiers: ' + classifiers.toString().green);

              if (!(tokens || classifiers)) {
                _context.next = 7;
                break;
              }

              _context.next = 6;
              return (0, _helpers.factoryActions)(state, intent.actions);

            case 6:
              resolve(state);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  }());
};