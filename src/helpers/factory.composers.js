'use strict';

import composeAsync from './composeAsync'

export default async (state) => {
  const { language, translator, classifier, nlp } = state.composer;
  const factory = composeAsync(language, translator, nlp, classifier);

  return await factory(state);
}
