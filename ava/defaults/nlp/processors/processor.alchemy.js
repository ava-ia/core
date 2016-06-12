// -- More info: https://github.com/framingeinstein/node-alchemy
'use strict';

import AlchemyAPI from 'alchemy-api';
import Credentials from '../../../credentials';

// -- Internal
const alchemy = new AlchemyAPI(Credentials.alchemy.apikey);

export default (state) => {
  return new Promise((resolve, reject) => {

    alchemy.taxonomies(state.sentence, {}, (error, response) => {
      const taxonomy = response.taxonomy[0];
      if (taxonomy) {
        state.nlp.taxonomy = (taxonomy.label.charAt(0) === '/') ? taxonomy.label.slice( 1 ) : taxonomy.label;
      }

      resolve(state);
    })
  });
}
