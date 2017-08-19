import gTranslate from 'google-translate-api';
// -- Internal
const ENGLISH = 'en';

export default async(state) => {
  if (state.language === ENGLISH) return state;

  const response = await gTranslate(state.rawSentence, { from: state.language, to: ENGLISH });
  if (response.from && response.text) {
    Object.assign(state, {
      language: response.from.language.iso,
      sentence: response.text,
    });
  }

  return state;
};
