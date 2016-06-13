'use strict';

// import path from 'path';
// const credentials = require(path.resolve('.', 'credentials.json'));
const file = require(process.cwd() + `/credentials.json`);

export default (key) => file[key];
