'use strict';

import { assert, expect, should } from 'chai';
import { Relations } from 'ava/defaults/nlp/processors';
import colors from 'colors';

// -- Mock

describe('ProcessorRelations', () => {

  let state;

  beforeEach( () => state = {sentence: '', nlp: {}})

  it('Up & Running', () => {
    state.sentence = 'hello world';
    const relations = Relations(state).nlp.relations;

    expect(Object.keys(relations).length).equal(1);
    expect(relations).to.have.all.keys('object');

    expect(relations.object).to.have.all.keys('text', 'tag');
    expect(relations.object.text).equal('world');
    expect(relations.object.tag).equal('noun');
  });

  it('Analize complex sentences', () => {
    state.sentence = "Ava, Do you know if tomorrow will rain in Bangkok?"
    const relations = Relations(state).nlp.relations;

    expect(relations).to.have.all.keys('subject', 'action', 'when', 'object', 'location');

    expect(relations.subject).to.have.all.keys('text', 'tag');
    expect(relations.subject.text).equal('ava');
    expect(relations.subject.tag).equal('person');

    expect(relations.action).to.have.all.keys('text', 'tag', 'verb');
    expect(relations.action.text).equal('will');
    expect(relations.action.tag).equal('verb');

    expect(relations.when).to.have.all.keys('text', 'tag');
    // expect(relations.when.text).equal('Sun Jun 12 2016 12:00:00 GMT+0700 (ICT)');
    expect(relations.when.tag).equal('date');

    expect(relations.object).to.have.all.keys('text', 'tag');
    expect(relations.object.text).equal('rain');
    expect(relations.object.tag).equal('noun');

    expect(relations.location).to.have.all.keys('text', 'tag');
    expect(relations.location.text).equal('bangkok');
    expect(relations.location.tag).equal('place');
  });

  it('Can detect if action is a past tense', () => {
    state.sentence = "I was there"
    const relations = Relations(state).nlp.relations;

    expect(relations.action).to.have.all.keys('text', 'tag', 'verb');
    expect(relations.action.verb.tense).equal('past');
  });

  it('Can detect if action is a future tense', () => {
    state.sentence = "I will be there"
    const relations = Relations(state).nlp.relations;

    expect(relations.action).to.have.all.keys('text', 'tag', 'verb');
    expect(relations.action.verb.tense).equal('future');
  });

  it('Can detect if action is negative', () => {
    state.sentence = "I won't be there"
    const relations = Relations(state).nlp.relations;

    expect(relations.action).to.have.all.keys('text', 'tag', 'verb');
    expect(relations.action.verb.negative).equal(true);
  });

  it('Can detect dates and parse to JavaScript type', () => {
    state.sentence = "I will be there tomorrow at 2pm"
    const relations = Relations(state).nlp.relations;

    expect(relations.when.text instanceof Date).equal(true)
  });

});
