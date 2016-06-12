'use strict';

import { composeAsync } from '../helpers'

export default (state) => {
  const { language, translator, classifier, nlp } = state.composer;
  const factory = composeAsync(language, translator, nlp, classifier);

  return new Promise( async (resolve, reject) => {
    factory(state)
      .then( state => resolve(state) )
      .catch( error => reject(error) )
  });
}
