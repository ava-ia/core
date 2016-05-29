// -- More info: https://github.com/framingeinstein/node-alchemy
'use strict';

import AlchemyAPI from 'alchemy-api';
// -- Internal
const CREDENTIALS = require('credentials/nlp.alchemy.json');
var alchemy = new AlchemyAPI(CREDENTIALS.apikey);

const Adaptor = (phrase, ava) => {
  return new Promise((resolve, reject) => {
    all(phrase, ava).then(response => resolve(response))
  });
}

export default Adaptor;

const all = async (phrase, ava) => {
  const time = new Date();
  let [entities, keywords, taxonomy, concepts, sentiment, relations] = await Promise.all([
    service('entities', phrase, 'entities', ava)
  ,
    service('keywords', phrase, 'keywords', ava)
  ,
    service('taxonomies', phrase, 'taxonomy', ava)
  ,
    service('concepts', phrase, 'concepts', ava)
  ,
    service('sentiment', phrase, 'docSentiment', ava)
  ,
    service('relations', phrase, 'relations', ava)
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

const service = (name, phrase, property, ava) => {
  return new Promise((resolve, reject) => {
    ava.step();
    alchemy[name](phrase, {}, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response[property]);
      }
    });
  })
}
