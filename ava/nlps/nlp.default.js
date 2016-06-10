'use strict';

// -- Processors
import { Alchemy, Compromise, Relations, Salient } from 'ava/nlps/processors'
// -- Modules
import composeAsync from 'modules/composeAsync'

export default (state) => {
  const time = new Date();
  const factory = composeAsync(Compromise, Salient, Relations, Alchemy);

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
