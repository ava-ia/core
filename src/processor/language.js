import cld from 'cld';

export default (state) => {
  return new Promise((resolve) => {
    cld.detect(state.rawSentence, (error, value) => {
      if (!error) {
        state.language = value.languages[0].code;
      }
      state.sentence = state.rawSentence;

      resolve(state);
    });
  });
};
