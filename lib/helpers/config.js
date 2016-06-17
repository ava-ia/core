'use strict';

// import path from 'path';
// const config = require(path.resolve('.', 'config.json'));

Object.defineProperty(exports, "__esModule", {
  value: true
});
var file = require(process.cwd() + '/config.json');

exports.default = function (key) {
  return file[key];
};