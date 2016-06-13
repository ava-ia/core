'use strict';

import pkg from '../package.json';
// -- Functions
import { languageCLD, translatorGoogle, nlp, classifierBayes } from './defaults';
import intent from './intent';
import listen from './listen';

export default (props = {}) => {

  let state = {
    version: pkg.version,
    composer: {
      language: props.language || languageCLD,
      translator: props.translator || translatorGoogle,
      nlp: props.nlp || nlp,
      classifier: props.classifier || classifierBayes,
    },
    intents: [],
    actions: []
  }

  return Object.assign(
    {},
    intent(state),
    listen(state),
  )
}
