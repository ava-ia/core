'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../helpers');

exports.default = function (state, actions) {
  console.log('IntentAny'.bold.green);

  return (0, _helpers.factoryActions)(state, actions);
};