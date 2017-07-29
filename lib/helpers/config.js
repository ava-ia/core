'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import path from 'path';
// const config = require(path.resolve('.', 'config.json'));

var file = void 0;

try {
  file = require(process.cwd() + '/config.json');
} catch (error) {
  file = {};
}

exports.default = function (key) {
  return file[key];
};