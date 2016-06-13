'use strict';

// import path from 'path';
// const credentials = require(path.resolve('.', 'credentials.json'));

Object.defineProperty(exports, "__esModule", {
  value: true
});
var file = require(process.cwd() + '/credentials.json');

exports.default = function (key) {
  return file[key];
};