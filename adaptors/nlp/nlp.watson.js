// -- More info: https://github.com/watson-developer-cloud/node-sdk
'use strict';

import Watson from 'watson-developer-cloud';
// -- Internal
const CREDENTIALS = require('credentials/nlp.alchemy.json');
var AlchemyLanguage = Watson.alchemy_language({ api_key: CREDENTIALS.apikey });

const Adaptor = (request, ava) => {
  return new Promise((resolve, reject) => {
    request.nlp = {};
    alchemy(request, ava).then(response => resolve(response))
  });
}

export default Adaptor;

const alchemy = async (request, ava) => {
  const time = new Date();

  let [entities, keywords, taxonomy, concepts, sentiment, relations] = await Promise.all([
    alchemyService('entities', request, 'entities', ava)
  ,
    alchemyService('keywords', request, 'keywords', ava)
  ,
    alchemyService('taxonomy', request, 'taxonomy', ava)
  ,
    alchemyService('concepts', request, 'concepts', ava)
  ,
    alchemyService('sentiment', request, 'docSentiment', ava)
  ,
    alchemyService('relations', request, 'relations', ava)
  ,
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

const alchemyService = (name, request, property, ava) => {
  return new Promise((resolve, reject) => {
    ava.step();
    AlchemyLanguage[name]({text: request.sentence}, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response[property]);
      }
    });
  })
}
