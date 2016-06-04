'use strict';

// -- Internal
const LANGUAGE = 'en';

export default (state) => ({
  listen: (sentence) => {
    state.rawSentence = sentence;

    return new Promise(async (resolve, reject) => {
      try {
        await state.composer.language(state);
        if (state.language.iso !== LANGUAGE) await state.composer.translator(state);
        await state.composer.classifier.categorize(state);
        await state.composer.nlp(state);
        if (state.nlp.taxonomy && state.classifier.label !== state.nlp.taxonomy.label) state.classifier.learn(state);

        state.actions = [];
        const intent = state.intents[0]
        await intent.script.call(null, state, intent);

        // -- @TODO: Iterate over all intents
        // state.intents.map(async (intent) => {
        //   await intent.script.call(null, state, intent.action);
        // });

        resolve(state);

      } catch (error) {
        console.log('listen.catch')
        reject(error);
      }
    });
  }
})
