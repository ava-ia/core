'use strict';

/* -- @TODO --------------------------------------------------------------------
   - Don't use the same {subject}/{object}
   - Use `noun` tag like `here` like a {location} relation
   - Improve value: `3 buses` must be {value: 3} {object: bus}
   - {when} must be correctly parse

   - [bug] `I hate when rain in London` is not detected by IntentWeather
----------------------------------------------------------------------------- */

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
// lexicon['ava', 'AVA', 'Ava'] = 'Person';
lexicon['Ava'] = 'Person';

export default (state) => {
  const sentence = state.sentence || Compromise.text(state.sentence).normal();
  const terms = Compromise.text(sentence, { lexicon }).sentences[0].terms;
  let relations = {};

  terms.map((term) => {
    let tag = (term.pos.Verb ? 'verb' : term.tag).toLowerCase();
    let relation;

    if (relation = TERMS_RELATIONS[tag]) {
      if (relation === TERMS_RELATIONS.person && relations[relation]) relation = TERMS_RELATIONS.noun;
      relations[relation] = extractRelation(tag, term, relations[relation]);
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

    case 'person':
      tag = term.pos.Pronoun ? 'pronoun' : tag;
      break;
  }

  relation.tag = tag;
  relation.text = text;

  return relation;
};
