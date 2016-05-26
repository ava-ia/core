'use strict';

import AlchemyAPI from 'alchemy-api';
import Hope from 'hope';
// -- Internal
import Ava from '../modules/ava';
const CREDENTIALS = require('./credentials/AlchemyAPI.json');
var alchemy = new AlchemyAPI(CREDENTIALS.apikey);

const Adaptor = (request) => {
  let promise = new Hope.Promise();

  const time = new Date();
  request.nlp.alchemy = {};
  Hope.join([
    () => _promisedAlchemy('sentiment', request, ['docSentiment'])
  ,
    () => _promisedAlchemy('entities', request, ['entities'])
  ,
    () => _promisedAlchemy('emotions', request, ['docEmotions'])
  ,
    () => _promisedAlchemy('relations', request, ['relations'])
  ,
    () => _promisedAlchemy('concepts', request, ['concepts'])
  ,
    () => _promisedAlchemy('keywords', request, ['keywords'])
  ]).then(() => {
    request.nlp.alchemy.ms = (new Date() - time);
    promise.done(null, request);
  });

  return promise;
}

export default Adaptor;

const _promisedAlchemy = (method, request, properties) => {
  let promise = new Hope.Promise();
  Ava.searching();

  const time = new Date();
  alchemy[method](request.sentence, {}, (error, response) => {
    if (error) promise.done(error, undefined);
    properties.forEach((item) => request.nlp.alchemy[item] = response[item])
    promise.done(null, request);
  });
  return promise;
};
