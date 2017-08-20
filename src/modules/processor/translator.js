import gTranslate from 'google-translate-api';
// -- Internal
const ENGLISH = 'en';

export default async(state) => {
  if (state.language === ENGLISH) return state;

  const { from = {}, text } = await gTranslate(state.rawSentence, { from: state.language, to: ENGLISH });
  if (from.language && text) {
    Object.assign(state, {
      language: from.language.iso,
      sentence: text,
    });
  }

  return state;
};
