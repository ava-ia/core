'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

    _weatherJs2.default.find({ search: location, degreeType: 'C' }, function (error, response) {
      if (error) return reject(error);
      var item = response[0];

      state.actions.push({
        ms: new Date() - ms,

        type: _constants2.default.action.type.rich,
        title: 'Conditions for ' + item.location.name + ' at ' + item.current.observationtime,
        value: {
          code: item.current.skycode,
          condition: item.current.skytext,
          temperature: item.current.temperature
        },
        date: item.current.date,
        extra: item.forecast
      });
      resolve(state);
    });
  });
};