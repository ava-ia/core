// -- More info: https://github.com/framingeinstein/node-alchemy
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alchemyApi = require('alchemy-api');

var _alchemyApi2 = _interopRequireDefault(_alchemyApi);

var _helpers = require('../../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var config = (0, _helpers.credentials)('alchemy');
var alchemy = new _alchemyApi2.default(config.apikey);

exports.default = function (state) {
  return new Promise(function (resolve, reject) {

    alchemy.taxonomies(state.sentence, {}, function (error, response) {
      var taxonomy = response.taxonomy[0];
      if (taxonomy) {
        state.nlp.taxonomy = taxonomy.label.charAt(0) === '/' ? taxonomy.label.slice(1) : taxonomy.label;
      }

      resolve(state);
    });
  });
};