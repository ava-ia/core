'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _composeAsync = require('./composeAsync');

var _composeAsync2 = _interopRequireDefault(_composeAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(state) {
    var _state$composer, language, translator, classifier, nlp, factory;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _state$composer = state.composer;
            language = _state$composer.language;
            translator = _state$composer.translator;
            classifier = _state$composer.classifier;
            nlp = _state$composer.nlp;
            factory = (0, _composeAsync2.default)(language, translator, nlp, classifier);
            _context.next = 8;
            return factory(state);

          case 8:
            return _context.abrupt('return', _context.sent);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return ref.apply(this, arguments);
  };
}();