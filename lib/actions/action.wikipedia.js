'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wtf_wikipedia = require('wtf_wikipedia');

var _wtf_wikipedia2 = _interopRequireDefault(_wtf_wikipedia);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var RELATIONS = ['object', 'subject', 'location'];
var DOCUMENT_TERMS = [
// -- Common
'image', 'website',
// 'links',
'iso_code',
// -- Person
'birth_place', 'occupation',
// -- Places
'pushpin_map', 'coordinates_region', 'population_total', 'population_netro', 'area_total_km2', 'utc_offset_DST'];
/* -- @TODO -------------------------------------------------------------------
    - Use document.infobox_template
    - Try to get image
----------------------------------------------------------------------------- */

exports.default = function (state) {

  return new Promise(function (resolve, reject) {
    var _relation = (0, _helpers.relation)(RELATIONS, state.relations);

    var object = _relation.object;
    var subject = _relation.subject;
    var location = _relation.location;

    var ms = new Date();
    var concept = object || location || subject;
    console.log('ActionWikipedia'.bold.yellow, 'concept: ' + concept);

    if (!concept) resolve(state);

    _wtf_wikipedia2.default.from_api(concept, 'en', function (response) {
      var document = _wtf_wikipedia2.default.parse(response);
      if (document.type === 'page' && document.categories.length > 0) {
        var summary = document.text.Intro.map(function (sentence) {
          return sentence.text;
        }).join(' ');

        state.action = {
          ms: new Date() - ms,
          engine: 'wikipedia',

          type: _constants2.default.action.type.rich,
          image: document.images[0],
          title: document.infobox.name ? document.infobox.name.text : concept,
          value: summary,
          related: _extract(document.infobox)
        };

        resolve(state);
      }
    });
  });
};

var _extract = function _extract() {
  var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var related = {};
  DOCUMENT_TERMS.map(function (key) {
    if (properties[key] && properties[key].text) related[key] = properties[key].text;
  });

  return related;
};