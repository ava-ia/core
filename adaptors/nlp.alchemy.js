'use strict';

import AlchemyAPI from 'alchemy-api';
import Hope from 'hope';
// -- Internal
const CREDENTIALS = require('./credentials/AlchemyAPI.json');
var alchemy = new AlchemyAPI(CREDENTIALS.apikey);

const Adaptor = (request) => {
  let promise = new Hope.Promise();

  request.nlp.alchemy = {};
  Hope.join([
    () => _promisedAlchemy('sentiment', request, ['language', 'docSentiment'])
  ,
    () => _promisedAlchemy('entities', request, ['entities'])
  ,
    () => _promisedAlchemy('emotions', request, ['docEmotions'])
  ]).then(() => {
    console.log(`
    <alchemy>
      <language>${request.nlp.alchemy.language}
      <docSentiment>${request.nlp.alchemy.docSentiment.type}
      <entities>${request.nlp.alchemy.entities}
      <docEmotions>${request.nlp.alchemy.docEmotions}
    </alchemy>`);
    promise.done(null, request);
  });

  return promise;
}

export default Adaptor;

const _promisedAlchemy = (method, request, properties) => {
  let promise = new Hope.Promise();
  alchemy[method](request.sentence, {}, (error, response) => {
    if (error) promise.done(error, undefined);
    properties.forEach((item) => request.nlp.alchemy[item] = response[item])
    promise.done(null, request);
  });
  return promise;
};
