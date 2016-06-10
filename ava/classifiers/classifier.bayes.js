// -- More info: https://github.com/ttezel/bayes
'use strict';

import Bayes from 'bayes';
// -- Modules
import Store from 'modules/store';

// -- Internal
const db = Store('classifiers.bayes.json');
const classifierForLanguage = (language) => {
  const value = db.get(language).value();
  return (value ? Bayes.fromJson(value) : Bayes());
};

export default (state) => {
  const time = new Date();
  const classifier = classifierForLanguage(state.language.iso);
  let categories = classifier.categorize(state.rawSentence);

  if (state.nlp.taxonomy && state.nlp.taxonomy !== categories) {
    classifier.learn(state.rawSentence, state.nlp.taxonomy);
    db.set(state.language.iso, classifier.toJson()).value();
    categories = state.nlp.taxonomy;
  }

  state.classifier = {
    engine: 'bayes',
    ms: (new Date() - time),
    categories: categories.split('/')
  };

  return state;
};
