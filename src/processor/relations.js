'use strict';

import Compromise from 'nlp_compromise';
import Chrono from 'chrono-node';
// -- Internal
const TERMS_RELATIONS = {
  person: 'subject',
  adverb: 'adverb',
  verb: 'action',
  noun: 'object',
  date: 'when',
  place: 'location',
  value: 'value'
};
let lexicon = Compromise.lexicon();
lexicon['ava'] = 'Person';
lexicon['here'] = 'Place';

export default (state) => {
  const sentence = state.sentence || Compromise.text(state.sentence).normal();
  const compromiseSentences = Compromise.text(sentence, { lexicon }).sentences
  const terms = (compromiseSentences[0]) ? compromiseSentences[0].terms : [];
  let relations = {};

  terms.map( term => {
    let tag = (term.pos.Verb ? 'verb' : term.tag).toLowerCase();
    let relation;

    if (relation = TERMS_RELATIONS[tag]) {
      if (relation === TERMS_RELATIONS.person && relations[relation]) {
        relation = (relations[relation] !== (term.normal || term.text)) ? TERMS_RELATIONS.noun : undefined;
      }
      if (relation) relations[relation] = extractRelation(tag, term, relations[relation]);
    }
  });
  state.relations = relations;

  return (state);
};

// -- Private methods
const extractRelation = (tag, term, previous) => {
  let relation = {};
  let text = term.normal || term.text;

  switch(tag) {
    case 'date':
      text = Chrono.parseDate(text)
      break;

    case 'verb':
      const compromiseVerb = Compromise.verb(term.expansion || term.text);
      if (!previous) {
        relation.verb = {
          tense: compromiseVerb.conjugation().toLowerCase().split('tense')[0],
          negative: compromiseVerb.isNegative()
        };
      } else {
        relation.verb = previous.verb;
      }
      text = compromiseVerb.conjugate().infinitive;
      break;

    case 'noun':
      text = Compromise.text(text).root()

    case 'person':
      tag = term.pos.Pronoun ? 'pronoun' : tag;
      break;
  }

  relation.tag = tag;
  relation.text = text;

  return relation;
};
