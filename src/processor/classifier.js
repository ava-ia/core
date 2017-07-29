// -- More info: https://github.com/ttezel/bayes
import bayes from 'bayes';
import { store } from '../helpers';

// -- Internal
const db = store('classifier.json');
const classifierForLanguage = (language) => {
  const value = db.get(language).value();
  return (value ? bayes.fromJson(value) : bayes());
};

export default (state) => {
  const classifier = classifierForLanguage(state.language);
  let categories = classifier.categorize(state.rawSentence);

  if (state.taxonomy && state.taxonomy !== categories) {
    classifier.learn(state.rawSentence, state.taxonomy);
    db.set(state.language, classifier.toJson()).value();
    categories = state.taxonomy;
  }
  state.classifier = categories ? categories.split('/') : [];

  return state;
};
