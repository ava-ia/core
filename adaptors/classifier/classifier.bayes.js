// -- More info: https://github.com/ttezel/bayes
'use strict';
import Bayes from 'bayes';
let classifier = Bayes();
const FILE = './store/classifier.bayes.json';

export default {
  learn: (text, category) => {
    classifier = Bayes.fromJson(stateJson);
    classifier.learn(text, category);
    this.save();
  },

  categorize: (text) => {
    return classifier.categorize(text);
  },

  save: () => {
    json = classifier.toJson()
  }
};
