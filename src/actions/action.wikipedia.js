'use strict';

import wikipedia from 'wtf_wikipedia';
import constants from '../constants'
import { relation } from '../helpers'
// -- Internal
const RELATIONS = ['object', 'subject', 'location'];
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
/* -- @TODO -------------------------------------------------------------------
    - Use document.infobox_template
    - Try to get image
----------------------------------------------------------------------------- */
export default (state) => {

  return new Promise((resolve, reject) => {
    const { object, subject, location } = relation(RELATIONS, state.relations);
    const ms = new Date()
    const concept = object || location || subject;
    if (state.debug)
      console.log('ActionWikipedia'.bold.yellow, `concept: ${concept}`);

    if (!concept) resolve(state)

    wikipedia.from_api(concept, 'en', (response) => {
      const document = wikipedia.parse(response);
      if (document.type === 'page' && document.categories.length > 0) {
        const summary = document.text.Intro.map( sentence => sentence.text ).join(' ');

        state.action = {
          ms: (new Date() - ms),
          engine: 'wikipedia',

          type: constants.action.type.rich,
          image: `http://en.wikipedia.org/wiki/${document.images[0]}`,
          title: document.infobox.name ? document.infobox.name.text : concept,
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
