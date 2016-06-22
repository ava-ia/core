'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionForecast = require('./action.forecast.yahoo');

Object.defineProperty(exports, 'forecastYahoo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_actionForecast).default;
  }
});

var _actionForecast2 = require('./action.forecast.msn');

Object.defineProperty(exports, 'forecastMSN', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_actionForecast2).default;
  }
});

var _actionMovie = require('./action.movie.themoviedb');

Object.defineProperty(exports, 'movieDB', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_actionMovie).default;
  }
});

var _action = require('./action.wikipedia');

Object.defineProperty(exports, 'wikipedia', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_action).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }