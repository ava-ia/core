import googleTranslate from 'google-translate-api';
// -- Internal
const LANGUAGE = 'en';

export default function(state) {
  return new Promise((resolve, reject) => {
    if (state.language === LANGUAGE) return resolve(state);

    return googleTranslate(state.rawSentence, { from: state.language, to: LANGUAGE })
      .then(response => {
        state.language = response.from.language.iso;
        state.sentence = response.text;
        resolve(state);
      })
      .catch(error => {
        reject(error);
      });
  });
}
