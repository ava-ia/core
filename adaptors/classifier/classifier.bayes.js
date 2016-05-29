// -- More info: https://github.com/ttezel/bayes
'use strict';
import LevelUp from 'levelup';
import Bayes from 'bayes';
// -- Internal
let db = LevelUp('./store/classifier.bayes')
let classifier = undefined;
db.get('bayes', function (error, value) {
  if (error) {
    classifier = Bayes();
  } else {
    classifier = Bayes.fromJson(value)
  }
})

export default {
  learn: (phrase, language, category) => {
    classifier.learn(phrase, category);
    return new Promise((resolve, reject) => {
      db.put('bayes', classifier.toJson(), (error) => {
        error ? reject(error) : resolve(category);
      });
    });
  },

  categorize: (phrase, language) => {
    return new Promise((resolve, reject) => {
      resolve(classifier.categorize(phrase));
    });
  }
};
