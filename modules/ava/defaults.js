'use strict';

import LanguageCLD from 'composers/language'
import TranslatorGoogle from 'composers/translator'
import ClassifierBayes from 'composers/classifier'
import NLPCore from 'composers/nlp'

export default {
  language: LanguageCLD,
  translator: TranslatorGoogle,
  classifier: ClassifierBayes,
  nlp: NLPCore,
};
