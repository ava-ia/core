'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _wtf_wikipedia = require('wtf_wikipedia');

var _wtf_wikipedia2 = _interopRequireDefault(_wtf_wikipedia);

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
var extract = function extract() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var related = {};

  DOCUMENT_TERMS.forEach(function (key) {
    if (properties[key] && properties[key].text) related[key] = properties[key].text;
  });

  return related;
};

exports.default = function (state) {
  var _relation = (0, _helpers.relation)(RELATIONS, state),
      object = _relation.object,
      subject = _relation.subject,
      location = _relation.location;

  var ms = new Date();
  var concept = object || location || subject;

  return new _promise2.default(function (resolve) {
    if (state.debug) {
      console.log('ActionWikipedia'.bold.yellow, 'concept: ' + concept);
    }

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
          entity: _helpers.entities.knowledge,
          image: 'http://en.wikipedia.org/wiki/' + document.images[0],
          title: document.infobox.name ? document.infobox.name.text : concept,
          value: summary,
          related: extract(document.infobox)
        };

        resolve(state);
      }
    });
  });
};