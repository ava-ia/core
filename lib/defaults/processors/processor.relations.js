'use strict';

/* -- @TODO --------------------------------------------------------------------
   - Don't use the same {subject}/{object}
   - Use `noun` tag like `here` like a {location} relation
   - Improve value: `3 buses` must be {value: 3} {object: bus}
   - {when} must be correctly parse

   - [bug] `I hate when rain in London` is not detected by IntentWeather
----------------------------------------------------------------------------- */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nlp_compromise = require('nlp_compromise');

var _nlp_compromise2 = _interopRequireDefault(_nlp_compromise);

var _chronoNode = require('chrono-node');

var _chronoNode2 = _interopRequireDefault(_chronoNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var TERMS_RELATIONS = {
  person: 'subject',
  adverb: 'adverb',
  verb: 'action',
  noun: 'object',
  date: 'when',
  place: 'location',
  value: 'value'
};
var COMPLEMENT_VERBS = ['can', 'must', 'should'];
var lexicon = _nlp_compromise2.default.lexicon();
lexicon['ava'] = 'Person';

exports.default = function (state) {
  var sentence = _nlp_compromise2.default.text(state.sentence).normal();
  var terms = _nlp_compromise2.default.text(sentence, { lexicon: lexicon }).sentences[0].terms;
  var relations = {};

  terms.map(function (term) {
    var tag = (term.pos.Verb ? 'verb' : term.tag).toLowerCase();
    var relation = void 0;

    if (relation = TERMS_RELATIONS[tag]) {
      if (relation === TERMS_RELATIONS.person && relations[relation]) relation = TERMS_RELATIONS.noun;
      relations[relation] = extractRelation(tag, term, relations[relation]);
    }
  });
  state.nlp.relations = relations;

  return state;
};

// -- Private methods


var extractRelation = function extractRelation(tag, term, previous) {
  var relation = {};
  var text = term.normal || term.text;

  switch (tag) {
    case 'date':
      text = _chronoNode2.default.parseDate(text);
      break;

    case 'verb':
      var compromiseVerb = _nlp_compromise2.default.verb(term.expansion || term.text);
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