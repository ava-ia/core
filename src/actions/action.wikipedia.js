import wikipedia from 'wtf_wikipedia';
import { entities, relation, trace } from '../helpers';
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
  'utc_offset_DST',
];
/* -- @TODO -------------------------------------------------------------------
    - Use document.infobox_template
    - Try to get image
----------------------------------------------------------------------------- */
const extract = (properties = {}) => {
  const related = {};

  DOCUMENT_TERMS.forEach((key) => {
    if (properties[key] && properties[key].text) related[key] = properties[key].text;
  });

  return related;
};

export default async(state) => {
  const { object, subject, location } = relation(RELATIONS, state);
  const concept = object || location || subject;

  return new Promise((resolve) => {
    trace('ActionWikipedia', { concept }, state);

    if (!concept) resolve(state);

    wikipedia.from_api(concept, 'en', (response) => {
      const { categories = [], sections = [], type, infobox = {}, images = [] } = wikipedia.parse(response);

      if (type === 'page' && categories.length > 0) {
        const { sentences = [] } = sections[0] || {};
        const summary = sentences.map(sentence => sentence.text).join(' ');

        resolve({
          engine: 'wikipedia',
          entity: entities.knowledge,
          image: images[0] && images[0].url,
          title: infobox.name ? infobox.name.text : concept,
          value: summary,
          related: extract(infobox),
        });
      }
    });
  });
};
