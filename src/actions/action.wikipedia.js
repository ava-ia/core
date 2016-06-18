'use strict';

import wikipedia from 'wtf_wikipedia';
import constants from '../constants'
import { relation } from '../helpers'
// -- Internal
const RELATIONS = ['object', 'location'];
const DOCUMENT_TERMS = [
  // -- Common
  'image',
  'website',
  // 'links',
  'iso_code',
  // -- Person
  'birth_place',
  'occupation',
  // -- Places
  'pushpin_map',
  'coordinates_region',
  'population_total',
  'population_netro',
  'area_total_km2',
  'utc_offset_DST'
]
// -- @TODO: Use document.infobox_template

export default (state) => {

  return new Promise((resolve, reject) => {
    const { object, location } = relation(RELATIONS, state.nlp.relations);
    const ms = new Date()
    console.log('ActionWikipedia'.bold.yellow, `object: ${object}, location: ${location}`);

    wikipedia.from_api(object || location, 'en', (response) => {
      const document = wikipedia.parse(response);
      if (document.type === 'page') {
        const summary = document.text.Intro.map( sentence => sentence.text ).join(' ');

        state.action = {
          ms: (new Date() - ms),
          engine: 'wikipedia',

          type: constants.action.type.rich,
          title: document.infobox.name ? document.infobox.name.text : '??',
          value: summary,
          related: _extract(document.infobox)
        };

        resolve(state);
      }
    });
  });
};

const _extract = (properties = {}) => {
  let related = {};
  DOCUMENT_TERMS.map( key => {
    if (properties[key] && properties[key].text) related[key] = properties[key].text;
  });

  return related;
}
