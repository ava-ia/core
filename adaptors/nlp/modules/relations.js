'use strict';

import Compromise from 'nlp_compromise';
import Chrono from 'chrono-node';
// -- Internal
const TERMS_RELATIONS = {
  person: 'subject',
  verb: 'action',
  noun: 'object',
  date: 'when',
  place: 'location',
  value: 'value',
  // @TODO: Get `adverbs` like `here`
};
const COMPLEMENT_VERBS = ['can', 'must', 'should'];

export default (terms) => {
  let relations = {};

  terms.map((term) => {
    let key = (term.pos.Verb ? 'verb' : term.tag).toLowerCase();
    let relation;

    if (relation = TERMS_RELATIONS[key]) {
      if (relation === TERMS_RELATIONS.person && relations[relation]) relation = TERMS_RELATIONS.noun;
      relations[relation] = extractRelationInfo(key, term);
    }
  });

  return relations;
};

// -- Private methods
const extractRelationInfo = (key, term) => {
  let tag;
  let verb;
  let value = term.normal && term.text;
  if (key === 'date') value = Chrono.parseDate(term.text).toString();
  if (key === 'verb') {
    value = Compromise.verb(term.text).conjugate().infinitive;
    verb = {text: term.text, tense: term.tag.split('Tense')[0].toLowerCase()};
  } else {
    tag = term.tag;
  }
  return { text: value, verb: verb, tag: tag };
};
