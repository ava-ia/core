'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var array1 = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var array2 = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  return array1.filter(function (item) {
    return array2.indexOf(item) != -1;
  }).length > 0;
};