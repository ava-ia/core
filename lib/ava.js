'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _intent = require('./intent');

var _intent2 = _interopRequireDefault(_intent);

var _listen = require('./listen');

var _listen2 = _interopRequireDefault(_listen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Functions
exports.default = function () {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var state = {
    version: _package2.default.version,
    intents: [],
    debug: props.debug || false
  };

  return (0, _assign2.default)({}, (0, _intent2.default)(state), (0, _listen2.default)(state));
};