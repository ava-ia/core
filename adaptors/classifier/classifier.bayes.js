// -- More info: https://github.com/ttezel/bayes
'use strict';
import LevelUp from 'levelup';
import Bayes from 'bayes';
// -- Internal
let db = LevelUp('./store/classifier.bayes')
let classifier = undefined; // or Bayes();

db.get('bayes', function (error, value) {
  if (error) return console.log('Ooops!', error) // likely the key was not found
  classifier = Bayes.fromJson(value)
})

export default {
  learn: (phrase, language, category) => {
    classifier.learn(phrase, category);
    let data = classifier.toJson()
    db.put('bayes', data, (error) => {
      if (error) return console.log('Ooops!', err)
    });
  },

  categorize: (phrase, language) => {
    return classifier.categorize(phrase);
  }
};
