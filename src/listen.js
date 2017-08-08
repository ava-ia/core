import { composeAsync, factoryIntents, timeout } from './helpers';
import factoryProcessor from './processor';

export default state => ({
  listen(sentence, ms) {
    return new Promise((resolve, reject) => {
      state.rawSentence = sentence;
      state.timestamp = new Date();

      if (ms) timeout(reject, ms);
      const factory = composeAsync(factoryProcessor, factoryIntents);

      factory(state)
        .then(() => {
          if (state.action) {
            resolve(state);
          } else {
            reject(new Error('Unknown action'));
          }
        })
        .catch((error) => {
          if (!error) error = { code: 0, message: "Sorry, I haven't understood you" };
          reject(error);
        });
    });
  },
});
