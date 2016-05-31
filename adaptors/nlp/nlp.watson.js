// -- More info: https://github.com/watson-developer-cloud/node-sdk
'use strict';

import Watson from 'watson-developer-cloud';
// -- Internal
const CREDENTIALS = require('credentials/nlp.alchemy.json');
var AlchemyLanguage = Watson.alchemy_language({ api_key: CREDENTIALS.apikey });

const Adaptor = (phrase) => {
  return new Promise((resolve, reject) => {
    alchemy(phrase).then(response => resolve(response))
  });
}

export default Adaptor;

const alchemy = async (phrase) => {
  const time = new Date();
  let [entities, keywords, taxonomy, concepts, sentiment, relations] = await Promise.all([
    alchemyService('entities', phrase, 'entities')
  ,
    alchemyService('keywords', phrase, 'keywords')
  ,
    alchemyService('taxonomy', phrase, 'taxonomy')
  ,
    alchemyService('concepts', phrase, 'concepts')
  ,
    alchemyService('sentiment', phrase, 'docSentiment')
  ,
    alchemyService('relations', phrase, 'relations')
  ,
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

const alchemyService = (name, phrase, property) => {
  return new Promise((resolve, reject) => {
    AlchemyLanguage[name]({text: phrase}, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response[property]);
      }
    });
  })
}
