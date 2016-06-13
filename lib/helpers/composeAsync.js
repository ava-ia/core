'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (state) {
    return fns.reduce(function (promise, fn) {
      return promise.then(fn);
    }, Promise.resolve(state));
  };
};