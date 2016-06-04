// -- More info: https://github.com/ttezel/bayes
'use strict';

import LevelUp from 'levelup';
import Bayes from 'bayes';
// -- Internal
const db = LevelUp('./store/classifier.bayes');
const classifierForLanguage = (key) => {
  return new Promise((resolve, reject) => {
    db.get(key, (error, value) => {
      if (error) {
        resolve(Bayes());
      } else {
        resolve(Bayes.fromJson(value));
      }
    });
  });
};

export default {

  learn: async (state) => {
    const classifier = await classifierForLanguage(state.language.iso);
    classifier.learn(state.rawSentence, state.nlp.taxonomy.label);
    db.put(state.language.iso, classifier.toJson());
  },

  categorize: async (state) => {
    const time = new Date();
    const classifier = await classifierForLanguage(state.language.iso);

    state.classifier = {
      engine: 'bayes',
      ms: (new Date() - time),
      label: classifier.categorize(state.sentence)
    };

    return state;
  }
};
