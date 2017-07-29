'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var NAMES = {
  lev: 'BGN',
  real: 'BRL',
  franc: 'CHF',
  yuan: 'CNY',
  koruna: 'CZK',
  krone: 'DKK',
  pound: 'GBP',
  euro: 'EUR',
  kuna: 'HRK',
  forint: 'HUF',
  rupiah: 'IDR',
  shekel: 'ILS',
  rupee: 'INR',
  yen: 'JPY',
  won: 'KRW',
  peso: 'MXN',
  ringgit: 'MYR',
  crone: 'NOK',
  zloti: 'PLN',
  leu: 'RON',
  ruble: 'RUB',
  baht: 'THB',
  lira: 'TRY',
  dollar: 'USD',
  rand: 'ZAR'
};
var getCurrency = function getCurrency(value) {
  return NAMES[value.toLowerCase()] || value.toUpperCase();
};

exports.default = function (state) {
  return new _promise2.default(function (resolve, reject) {
    var ms = new Date();
    var match = (0, _helpers.syntax)(state.sentence, '[value] [currency] [preposition]? [currency]');
    var from = getCurrency(match.currency[0]);
    var to = getCurrency(match.currency[1]);
    var value = parseFloat(match.value);

    if (state.debug) console.log('ActionCurrency'.bold.yellow, 'match:', match);

    (0, _nodeFetch2.default)('http://api.fixer.io/latest?base=' + from + '&symbols=' + to).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json && json.rates && (0, _keys2.default)(json.rates).length > 0) {
        var conversion = value * json.rates[to];
        state.action = {
          ms: new Date() - ms,
          engine: 'fixer.io',
          title: value + ' ' + from + ' are ' + conversion.toFixed(3) + ' ' + to,
          value: conversion,
          entity: _helpers.entities.object
        };
      }
      resolve(state);
    }).catch(reject);
  });
};