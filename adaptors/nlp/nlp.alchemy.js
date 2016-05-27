// -- More info: https://github.com/framingeinstein/node-alchemy
'use strict';

import AlchemyAPI from 'alchemy-api';
import Hope from 'hope';
// -- Internal
const CREDENTIALS = require('credentials/nlp.alchemy.json');
var alchemy = new AlchemyAPI(CREDENTIALS.apikey);

const Adaptor = (request, ava) => {
  let promise = new Hope.Promise();

  const time = new Date();
  request.nlp.alchemy = {};
  Hope.join([
    () => _promisedAlchemy('sentiment', request, ['docSentiment'], ava)
  ,
    () => _promisedAlchemy('entities', request, ['entities'], ava)
  ,
    () => _promisedAlchemy('emotions', request, ['docEmotions'], ava)
  ,
    () => _promisedAlchemy('relations', request, ['relations'], ava)
  ,
    () => _promisedAlchemy('concepts', request, ['concepts'], ava)
  ,
    () => _promisedAlchemy('keywords', request, ['keywords'], ava)
  ,
    () => _promisedAlchemy('taxonomies', request, ['taxonomy'], ava)
  ,
    () => _promisedAlchemy('category', request, ['category'], ava)
  ]).then(() => {
    request.nlp.alchemy.ms = (new Date() - time);
    promise.done(null, request);
  });

  return promise;
}

export default Adaptor;

const _promisedAlchemy = (method, request, properties, ava) => {
  let promise = new Hope.Promise();
  ava.step();

  const time = new Date();
  alchemy[method](request.sentence, {}, (error, response) => {
    if (error) promise.done(error, undefined);
    properties.forEach((item) => request.nlp.alchemy[item] = response[item])
    promise.done(null, request);
  });
  return promise;
};
