'use strict';

import { compromise, taxonomy, relations, sentiment } from './processors'
import { composeAsync } from '../helpers'

export default (state) => {
  const time = new Date();
  const factory = composeAsync(compromise, taxonomy, relations, sentiment);

  return new Promise( (resolve, reject) => {
    state.sentence = state.sentence.toLowerCase();
    state.nlp = {};

    factory(state)
      .then( state => {
        state.nlp.ms = (new Date() - time);
        resolve(state)
      })
      .catch( error => reject(error) )
  });
};
