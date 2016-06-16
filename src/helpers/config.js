'use strict';

// import path from 'path';
// const config = require(path.resolve('.', 'config.json'));
const file = require(process.cwd() + `/config.json`);

export default (key) => file[key];
