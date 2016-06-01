'use strict';

// -- Adaptors
import Language from 'adaptors/language'
// -- Internal
import metadata from './metadata'
const LANGUAGE = 'en';

export default async (ava, text) => {
  let request = { raw: text, phrase: text };

  request.language = await Language(request.phrase);
  if (request.language.iso !== LANGUAGE) {
    request.language = await ava.props.translator(request.phrase, request.language.iso);
    request.phrase = request.language.phrase;
    delete request.language.phrase;
  }
  request.classifier = await ava.props.classifier.categorize(request.phrase, request.language.iso);
  request.nlp = await ava.props.nlp(request.phrase);
  if (request.nlp.taxonomy && request.classifier !== request.nlp.taxonomy.label) {
    ava.props.classifier.learn(request.raw, request.language.iso, request.nlp.taxonomy.label);
  }

  metadata(request);
  return request;
};
