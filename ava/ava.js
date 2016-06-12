'use strict';

import pkg from '../package.json';
// -- Functions
import { LanguageCLD, TranslatorGoogle, NLP, ClassifierBayes } from './defaults';
import intent from './intent';
import listen from './listen';

export default (props = {}) => {

  let state = {
    version: pkg.version,
    composer: {
      language: props.language || LanguageCLD,
      translator: props.translator || TranslatorGoogle,
      nlp: props.nlp || NLP,
      classifier: props.classifier || ClassifierBayes,
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
