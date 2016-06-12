'use strict';

import { Compromise, Taxonomy, Relations, Sentiment } from './processors'
import { composeAsync } from '../../helpers'

export default (state) => {
  const time = new Date();
  const factory = composeAsync(Compromise, Taxonomy, Relations, Sentiment);

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
