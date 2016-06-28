'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var API = 'http://query.yahooapis.com/v1/public/yql?q=';
var RELATIONS = ['when', 'location'];

exports.default = function (state) {

  return new Promise(function (resolve, reject) {
    var _relation = (0, _helpers.relation)(RELATIONS, state);

    var location = _relation.location;
    var when = _relation.when;

    var ms = new Date();
    var query = escape('select item from weather.forecast where woeid in (select woeid from geo.places where text=\'' + location + '\') and u=\'c\' | truncate(count=1)');
    if (state.debug) console.log('ActionForecastYahoo'.bold.yellow, 'location: ' + location + ', when: ' + when);

    if (!location) return resolve((0, _helpers.request)(state, { relation: ['location'] }));

    (0, _nodeFetch2.default)('' + API + query + '&format=json').then(function (response) {
      return response.json();
    }).then(function (body) {
      var item = body.query.results.channel.item;
      var condition = _determineCondition(item.condition, item.forecast, when);
      state.action = {
        ms: new Date() - ms,
        engine: 'yahoo',
        entity: _helpers.entities.knowledge,
        title: item.title,
        url: item.link.split('*')[1],
        value: condition
      };
      if (!when) state.action.related = item.forecast;

      resolve(state);
    }).catch(function (error) {
      reject(error);
    });
  });
};

var _determineCondition = function _determineCondition() {
  var condition = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var forecast = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var when = arguments[2];

  var value = {
    code: condition.code,
    condition: condition.text,
    temperature: condition.temp,
    date: (0, _moment2.default)(condition.date, 'ddd, DD MMM YYYY hh:mm A ZZ').format()
  };

  forecast.map(function (condition) {
    var date = (0, _moment2.default)(condition.date, 'DD MMM YYYY');
    if (date.isSame(when, 'day')) {
      return value = {
        code: condition.code,
        condition: condition.text,
        temperature: [condition.low, condition.high],
        date: date.format()
      };
    }
  });

  return value;
};