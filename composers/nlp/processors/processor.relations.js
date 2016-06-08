'use strict';

/* -- @TODO --------------------------------------------------------------------
   - Don't use the same subject/object
   - Use `adverbs` like `here` (for example for create where relation)
   - Remove complement verbs or only get the first part of verb

   - When use `it's` crash
----------------------------------------------------------------------------- */

import Compromise from 'nlp_compromise';
import Chrono from 'chrono-node';
// -- Internal
const TERMS_RELATIONS = {
  person: 'subject',
  verb: 'action',
  noun: 'object',
  date: 'when',
  place: 'location',
  value: 'value'
};
const COMPLEMENT_VERBS = ['can', 'must', 'should'];
let lexicon = Compromise.lexicon()
lexicon['ava'] = 'Person';

export default (state) => {
  const root_sentence = Compromise.text(state.sentence).root();
  const terms = Compromise.text(root_sentence, {lexicon:lexicon}).sentences[0].terms;
  let relations = {};

  terms.map((term) => {
    let key = (term.pos.Verb ? 'verb' : term.tag).toLowerCase();
    let relation;

    if (relation = TERMS_RELATIONS[key]) {
      if (relation === TERMS_RELATIONS.person && relations[relation]) relation = TERMS_RELATIONS.noun;
      relations[relation] = extractRelation(key, term);
    }
  });
  state.nlp.relations = relations;

  return (state);
};

// -- Private methods
const extractRelation = (key, term) => {
  let tag;
  let verb;
  let value = term.normal && term.text;
  if (key === 'date') value = (Chrono.parseDate(term.text) || '').toString();
  if (key === 'verb') {
    value = Compromise.verb(term.text).conjugate().infinitive;
    verb = {text: term.text, tense: term.tag.split('Tense')[0].toLowerCase()};
  } else {
    tag = term.tag;
  }
  return { text: value, verb: verb, tag: tag };
};
