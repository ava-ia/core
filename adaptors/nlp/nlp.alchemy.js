// -- More info: https://github.com/framingeinstein/node-alchemy
'use strict';

import AlchemyAPI from 'alchemy-api';
// -- Internal
const CREDENTIALS = require('credentials/nlp.alchemy.json');
var alchemy = new AlchemyAPI(CREDENTIALS.apikey);

const Adaptor = (request, ava) => {
  return new Promise((resolve, reject) => {
    request.nlp = {};
    all(request, ava).then(response => resolve(response))
  });
}

export default Adaptor;

const all = async (request, ava) => {
  const time = new Date();

  let [entities, keywords, taxonomy, concepts, sentiment, relations] = await Promise.all([
    service('entities', request, 'entities', ava)
  ,
    service('keywords', request, 'keywords', ava)
  ,
    service('taxonomies', request, 'taxonomies', ava)
  ,
    service('concepts', request, 'concepts', ava)
  ,
    service('sentiment', request, 'docSentiment', ava)
  ,
    service('relations', request, 'relations', ava)
  ]);
  request.nlp.ms = (new Date() - time);
  request.nlp.entities = entities;
  request.nlp.keywords = keywords;
  request.nlp.taxonomy = taxonomy;
  request.nlp.concepts = concepts;
  request.nlp.sentiment = sentiment;
  request.nlp.relations = relations;
  return request;
}

const service = (name, request, property, ava) => {
  return new Promise((resolve, reject) => {
    ava.step();
    alchemy[name](request.sentence, {}, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response[property]);
      }
    });
  })
}
