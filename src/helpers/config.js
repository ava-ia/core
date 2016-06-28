'use strict';

// import path from 'path';
// const config = require(path.resolve('.', 'config.json'));

let file;
try {
  file = require(process.cwd() + '/config.json');
} catch (error) {
  file = {};
}

export default (key) => file[key];
