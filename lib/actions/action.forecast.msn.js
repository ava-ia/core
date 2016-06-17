'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _weatherJs = require('weather-js');

var _weatherJs2 = _interopRequireDefault(_weatherJs);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var RELATIONS = ['when', 'location'];

exports.default = function (state) {

  return new Promise(function (resolve, reject) {
    var _relation = (0, _helpers.relation)(RELATIONS, state.nlp.relations);

    var location = _relation.location;
    var when = _relation.when;

    var ms = new Date();
    console.log('ActionForecastMSN'.bold.yellow, 'location: ' + location + ', when: ' + when);

    if (!location) {
      state.action = {
        type: _constants2.default.action.type.request,
        request: { relation: ['location'] }
      };
      resolve(state);
    }

    _weatherJs2.default.find({ search: location, degreeType: 'C' }, function (error, response) {
      if (error) return reject(error);

      var item = response[0];
      var condition = _determineCondition(item.current, item.forecast, when);
      state.action = {
        ms: new Date() - ms,
        engine: 'msn',

        type: _constants2.default.action.type.rich,
        title: 'Conditions for ' + item.location.name + ' at ' + item.current.observationtime,
        value: condition
      };
      if (!when) state.action.related = item.forecast;

      resolve(state);
    });
  });
};

var _determineCondition = function _determineCondition() {
  var condition = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var forecast = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var when = arguments[2];

  var value = {
    code: condition.skycode,
    condition: condition.skytext,
    temperature: condition.temperature,
    humidity: condition.humidity,
    wind: condition.windspeed,
    date: (0, _moment2.default)(condition.date, 'YYYY-MM-DD').format()
  };

  forecast.map(function (condition) {
    var date = (0, _moment2.default)(condition.date, 'YYYY-MM-DD');
    if (date.isSame(when, 'day')) {
      return value = {
        code: condition.skycodeday,
        condition: condition.skytextday,
        temperature: [condition.low, condition.high],
        date: date.format()
      };
    }
  });

  return value;
};