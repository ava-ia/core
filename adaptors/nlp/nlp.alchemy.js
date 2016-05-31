// -- More info: https://github.com/framingeinstein/node-alchemy
'use strict';

import AlchemyAPI from 'alchemy-api';
// -- Internal
const CREDENTIALS = require('credentials/nlp.alchemy.json');
var alchemy = new AlchemyAPI(CREDENTIALS.apikey);

const Adaptor = (phrase) => {
  return new Promise((resolve, reject) => {
    all(phrase).then(response => resolve(response))
  });
}

export default Adaptor;

const all = async (phrase) => {
  const time = new Date();
  let [entities, keywords, taxonomy, concepts, sentiment, relations] = await Promise.all([
    service('entities', phrase, 'entities')
  ,
    service('keywords', phrase, 'keywords')
  ,
    service('taxonomies', phrase, 'taxonomy')
  ,
    service('concepts', phrase, 'concepts')
  ,
    service('sentiment', phrase, 'docSentiment')
  ,
    service('relations', phrase, 'relations')
  ]);

  return {
    ms: (new Date() - time),
    entities: entities,
    keywords: keywords,
    taxonomy: taxonomy.length > 0 ? taxonomy[0] : undefined,
    concepts: concepts,
    sentiment: sentiment,
    relations: relations
  };
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
