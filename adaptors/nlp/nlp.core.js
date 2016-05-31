'use strict';

// -- NLPs
import {NLPCompromise, NLPSalient} from 'adaptors/nlp'
// -- Modules
import relations from 'adaptors/nlp/modules/relations'

export default async (phrase) => {
  const time = new Date();
  return new Promise((resolve, reject) => {
    composer(phrase).then((nlp) => {
      resolve({
        engine: 'core',
        ms: (new Date() - time),

        relations: relations(nlp.compromise.sentences[0].terms),
        sentiment: nlp.salient.sentiment,
        tokens: nlp.salient.tokens,
        topic: nlp.compromise.topics,
        type: nlp.compromise.type,
      })
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
