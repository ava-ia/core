'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _processors = require('./processors');

var _helpers = require('../helpers');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(state) {
    var time, factory;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            time = new Date();
            factory = (0, _helpers.composeAsync)(_processors.compromise, _processors.taxonomy, _processors.relations, _processors.sentiment);


            state.sentence = state.sentence.toLowerCase();
            state.nlp = {};
            _context.next = 6;
            return factory(state);

          case 6:
            state.nlp.ms = new Date() - time;

            return _context.abrupt('return', state);

          case 8:
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