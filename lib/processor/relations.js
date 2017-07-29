'use strict';

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
  city: 'location',
  value: 'value'
};
var lexicon = _nlp_compromise2.default.lexicon();
lexicon.ava = 'Person';
lexicon.here = 'Place';

// -- Private methods
var extractRelation = function extractRelation(tag, term, previous) {
  var relation = {};
  var text = term.normal || term.text;

  switch (tag) {
    case 'date':
      {
        text = _chronoNode2.default.parseDate(text);
        break;
      }

    case 'verb':
      {
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
      }

    case 'noun':
      {
        text = _nlp_compromise2.default.text(text).root();
        break;
      }

    case 'person':
      {
        tag = term.pos.Pronoun ? 'pronoun' : tag;
        break;
      }

    default:
      break;
  }

  relation.tag = tag;
  relation.text = text;

  return relation;
};

exports.default = function (state) {
  var sentence = state.sentence || _nlp_compromise2.default.text(state.sentence).normal();
  var compromiseSentences = _nlp_compromise2.default.text(sentence, { lexicon: lexicon }).sentences;
  var terms = compromiseSentences[0] ? compromiseSentences[0].terms : [];
  var relations = {};

  terms.forEach(function (term) {
    var tag = (term.pos.Verb ? 'verb' : term.tag).toLowerCase();
    var relation = TERMS_RELATIONS[tag];

    if (relation) {
      if (relation === TERMS_RELATIONS.person && relations[relation]) {
        relation = relations[relation] !== (term.normal || term.text) ? TERMS_RELATIONS.noun : undefined;
      }
      if (relation) relations[relation] = extractRelation(tag, term, relations[relation]);
    }
  });
  state.relations = relations;

  return state;
};