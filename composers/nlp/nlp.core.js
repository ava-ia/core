'use strict';

// -- NLPs
import {NLPCompromise, NLPSalient} from 'composers/nlp'
// -- Modules
import relations from 'composers/nlp/modules/relations'

export default async (state) => {
  const time = new Date();
  state.sentence = state.sentence.toLowerCase();

  return new Promise((resolve, reject) => {
    composer(state.sentence).then((nlp) => {
      state.nlp = {
        engine: 'core',
        ms: (new Date() - time),

        concepts: nlp.salient.concepts,
        // glossary: nlp.salient.glossary,
        relations: relations(nlp.compromise.sentences[0].terms),
        sentiment: nlp.salient.sentiment,
        tokens: nlp.salient.tokens,
        topic: nlp.compromise.topics,
        type: nlp.compromise.type,
      }

      resolve(state);
    });
  });
};

const composer = async (phrase) => {
  let [compromise, salient] = await Promise.all([
    NLPCompromise(phrase)
  ,
    NLPSalient(phrase)
  ]);

  return {
    compromise: compromise || {},
    salient: salient || {},
  };
};
