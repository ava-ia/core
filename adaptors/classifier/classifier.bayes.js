// -- More info: https://github.com/ttezel/bayes
'use strict';
import LevelUp from 'levelup';
import Bayes from 'bayes';
// -- Internal
let db = LevelUp('./store/classifier.bayes');
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
  learn: async (phrase, language, category) => {
    let classifier = await classifierForLanguage(language);
    classifier.learn(phrase, category);
    db.put(language, classifier.toJson());
  },

  categorize: async (phrase, language) => {
    const time = new Date();
    let classifier = await classifierForLanguage(language);
    return {
      engine: 'bayes',
      ms: (new Date() - time),
      category: classifier.categorize(phrase)
    };
  }
};
