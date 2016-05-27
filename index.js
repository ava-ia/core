process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

require('babel-register');
require('modules/terminal');
