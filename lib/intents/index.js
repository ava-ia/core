'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _intent = require('./intent.weather');

Object.defineProperty(exports, 'weather', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_intent).default;
  }
});

var _intent2 = require('./intent.movie');

Object.defineProperty(exports, 'movie', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_intent2).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }