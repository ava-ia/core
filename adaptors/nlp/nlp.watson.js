// -- More info: https://github.com/watson-developer-cloud/node-sdk
'use strict';

import Watson from 'watson-developer-cloud';
// -- Internal
const CREDENTIALS = require('credentials/nlp.alchemy.json');
var AlchemyLanguage = Watson.alchemy_language({ api_key: CREDENTIALS.apikey });

const Adaptor = (phrase, ava) => {
  return new Promise((resolve, reject) => {
    alchemy(phrase, ava).then(response => resolve(response))
  });
}

export default Adaptor;

const alchemy = async (phrase, ava) => {
  const time = new Date();
  let [entities, keywords, taxonomy, concepts, sentiment, relations] = await Promise.all([
    alchemyService('entities', phrase, 'entities', ava)
  ,
    alchemyService('keywords', phrase, 'keywords', ava)
  ,
    alchemyService('taxonomy', phrase, 'taxonomy', ava)
  ,
    alchemyService('concepts', phrase, 'concepts', ava)
  ,
    alchemyService('sentiment', phrase, 'docSentiment', ava)
  ,
    alchemyService('relations', phrase, 'relations', ava)
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

const alchemyService = (name, phrase, property, ava) => {
  return new Promise((resolve, reject) => {
    ava.step();
    AlchemyLanguage[name]({text: phrase}, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response[property]);
      }
    });
  })
}
