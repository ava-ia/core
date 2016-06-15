// -- More info: https://github.com/framingeinstein/node-alchemy
'use strict';

import AlchemyAPI from 'alchemy-api';
import { credentials } from '../../helpers';
// -- Internal
const config = credentials('alchemy');
let processor;
if (config) processor = new AlchemyAPI(config.apikey);

export default (state) => {
  if (!config) return (state);

  return new Promise((resolve, reject) => {
    processor.taxonomies(state.sentence, {}, (error, response) => {
      const taxonomy = response.taxonomy[0];
      if (taxonomy) {
        state.nlp.taxonomy = (taxonomy.label.charAt(0) === '/') ? taxonomy.label.slice( 1 ) : taxonomy.label;
      }

      resolve(state);
    })
  });
}
