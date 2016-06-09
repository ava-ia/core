// -- More info: https://github.com/ttezel/bayes
'use strict';

import Bayes from 'bayes';
// -- Modules
import Store from 'modules/store';

// -- Internal
const db = Store('classifiers/bayes.json');
const classifierForLanguage = (language) => {
  const value = db.get(language).value();
  return (value ? Bayes.fromJson(value) : Bayes());
};

export default {

  learn: async (state) => {
    const classifier = await classifierForLanguage(state.language.iso);

    classifier.learn(state.rawSentence, state.nlp.taxonomy);
    db.set(state.language.iso, classifier.toJson()).value();
  },

  categorize: async (state) => {
    const time = new Date();
    const classifier = await classifierForLanguage(state.language.iso);

    state.classifier = {
      engine: 'bayes',
      ms: (new Date() - time),
      categories: classifier.categorize(state.rawSentence) || []
    };

    return state;
  }
};
