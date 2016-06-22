'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (reject) {
  var ms = arguments.length <= 1 || arguments[1] === undefined ? 60000 : arguments[1];
  return setTimeout(function () {
    reject(new Error('Timeout after ' + ms + ' ms'));
  }, ms);
};