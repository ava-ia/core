import Hope from 'hope';
import cld from 'cld';
// -- Internal
const DEFAULT_VALUE = { name: 'ENGLISH', code: 'EN', percent: 0, score: 0 };

const language = (text) => {
  let promise = new Hope.Promise();

  cld.detect(text, (error, value) => {
    let language = DEFAULT_VALUE;
    if (!error) {
      language = value.languages[0];
    }
    console.log('  <language>', language);
    promise.done(undefined, language);
  });

  return promise;
}

export default language;
