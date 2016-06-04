'use strict';

import composeAsync from 'modules/composeAsync'

export default (state) => {
  const { language, translator, classifier, nlp } = state.composer;
  const factory = composeAsync(language, translator, classifier.categorize, nlp);

  return new Promise( async (resolve, reject) => {
    factory(state)
      .then( state => resolve(state) )
      .catch( error => reject(state) )
  });
}
