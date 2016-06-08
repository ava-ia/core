'use strict';

import LanguageCLD from 'ava/languages'
import TranslatorGoogle from 'ava/translators'
import ClassifierBayes from 'ava/classifiers'
import NLPDefault from 'ava/nlps'

export default {
  language: LanguageCLD,
  translator: TranslatorGoogle,
  classifier: ClassifierBayes,
  nlp: NLPDefault,
};
