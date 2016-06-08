// -- More info: https://github.com/framingeinstein/node-alchemy
'use strict';

import AlchemyAPI from 'alchemy-api';
// -- Internal
const CREDENTIALS = require('credentials/nlp.alchemy.json');
var alchemy = new AlchemyAPI(CREDENTIALS.apikey);

const Adaptor = (state) => {
  return new Promise((resolve, reject) => {
    all(state).then(state => resolve(state))
  });
}

export default Adaptor;

const all = async (state) => {
  const time = new Date();

  let [taxonomy] = await Promise.all([
    service('taxonomies', state.sentence, 'taxonomy')
  ]);

  if (taxonomy.length > 0) state.nlp.taxonomy = taxonomy[0].label;

  return (state);
}

const service = (name, phrase, property) => {
  return new Promise((resolve, reject) => {
    alchemy[name](phrase, {}, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response[property]);
      }
    });
  })
}
