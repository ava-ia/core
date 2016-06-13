// -- More info: https://github.com/typicode/lowdb
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lowdb = require('lowdb');

var _lowdb2 = _interopRequireDefault(_lowdb);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var folder = _path2.default.resolve('.', 'store');
// const folder = process.cwd() + '/store';

if (!_fs2.default.existsSync(folder)) _fs2.default.mkdirSync(folder);

exports.default = function (file) {
  var defaults = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var store = (0, _lowdb2.default)(folder + '/' + file, { storage: require('lowdb/lib/file-async') });

  if (defaults) store.defaults(defaults).value();

  return store;
};