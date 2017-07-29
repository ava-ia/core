'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _weatherJs = require('weather-js');

var _weatherJs2 = _interopRequireDefault(_weatherJs);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var RELATIONS = ['when', 'location'];

var determineCondition = function determineCondition() {
  var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var forecast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var when = arguments[2];

  var value = {
    code: condition.skycode,
    condition: condition.skytext,
    temperature: condition.temperature,
    humidity: condition.humidity,
    wind: condition.windspeed,
    date: (0, _moment2.default)(condition.date, 'YYYY-MM-DD').format()
  };

  if (when) {
    var day = forecast.find(function (item) {
      return (0, _moment2.default)(item.date, 'YYYY-MM-DD').isSame(when, 'day');
    });
    if (day) {
      value = {
        code: day.skycodeday,
        condition: day.skytextday,
        temperature: [day.low, day.high],
        date: (0, _moment2.default)(day.date, 'YYYY-MM-DD').format()
      };
    }
  }
  return value;
};

exports.default = function (state) {
  var _relation = (0, _helpers.relation)(RELATIONS, state),
      location = _relation.location,
      when = _relation.when;

  var ms = new Date();

  return new _promise2.default(function (resolve) {
    if (state.debug) {
      console.log('ActionForecastMSN'.bold.yellow, 'location: ' + location + ', when: ' + when);
    }

    if (!location) return resolve((0, _helpers.request)(state, { relation: ['location'] }));

    return _weatherJs2.default.find({ search: location, degreeType: 'C' }, function (error, response) {
      if (!error) {
        var item = response[0];
        var condition = determineCondition(item.current, item.forecast, when);
        state.action = {
          ms: new Date() - ms,
          engine: 'msn',
          entity: _helpers.entities.knowledge,
          title: 'Conditions for ' + item.location.name + ' at ' + item.current.observationtime,
          value: condition
        };
        if (!when) state.action.related = item.forecast;

        resolve(state);
      }
    });
  });
};