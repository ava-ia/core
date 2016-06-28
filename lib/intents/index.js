'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _intent = require('./intent.any');

Object.defineProperty(exports, 'any', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_intent).default;
  }
});

var _intent2 = require('./intent.conversor');

Object.defineProperty(exports, 'conversor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_intent2).default;
  }
});

var _intent3 = require('./intent.movie');

Object.defineProperty(exports, 'movie', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_intent3).default;
  }
});

var _intent4 = require('./intent.translate');

Object.defineProperty(exports, 'translate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_intent4).default;
  }
});

var _intent5 = require('./intent.weather');

Object.defineProperty(exports, 'weather', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_intent5).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }