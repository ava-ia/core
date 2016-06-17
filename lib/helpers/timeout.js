'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeout = (0, _config2.default)('timeout') || 60000;

exports.default = function (reject) {
  return setTimeout(function () {
    reject(new Error('Timeout after ' + timeout + ' ms'));
  }, timeout);
};