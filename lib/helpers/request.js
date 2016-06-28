'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entities = require('./entities');

var _entities2 = _interopRequireDefault(_entities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state, request) {
  state.action = { entity: _entities2.default.request, request: request };

  return state;
};