"use strict";

import pkg from 'package.json';
// -- Default composers
import LanguageCLD from 'composers/language'
import TranslatorGoogle from 'composers/translator'
import ClassifierBayes from 'composers/classifier'
import NLPCore from 'composers/nlp'
// -- Functions
import intent from './intent';
import listen from './listen';

export default (props) => {

  let state = {
    version: pkg.version,
    composer: {
      language: props.language || LanguageCLD,
      translator: props.translator || TranslatorGoogle,
      classifier: props.classifier || ClassifierBayes,
      nlp: props.core || NLPCore,
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
