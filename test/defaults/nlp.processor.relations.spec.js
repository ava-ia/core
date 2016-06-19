'use strict';

import { assert, expect, should } from 'chai';
import { relations } from '../../src/defaults/processors';
import colors from 'colors';

// -- Mock

describe('ProcessorRelations', () => {

  let state;

  beforeEach( () => state = {sentence: '', nlp: {}})

  it('Up & Running', () => {
    state.sentence = 'hello world';
    const nlp = relations(state).nlp.relations;

    expect(Object.keys(nlp).length).equal(1);
    expect(nlp).to.have.all.keys('object');

    expect(nlp.object).to.have.all.keys('text', 'tag');
    expect(nlp.object.text).equal('world');
    expect(nlp.object.tag).equal('noun');
  });

  it('Analize complex sentences', () => {
    state.sentence = "Ava, Do you know if tomorrow will rain in Bangkok?"
    const nlp = relations(state).nlp.relations;

    expect(nlp).to.have.all.keys('subject', 'action', 'when', 'object', 'location');

    expect(nlp.subject).to.have.all.keys('text', 'tag');
    expect(nlp.subject.text).equal('ava');
    expect(nlp.subject.tag).equal('person');

    expect(nlp.action).to.have.all.keys('text', 'tag', 'verb');
    expect(nlp.action.text).equal('will');
    expect(nlp.action.tag).equal('verb');

    expect(nlp.when).to.have.all.keys('text', 'tag');
    // expect(nlp.when.text).equal('Sun Jun 12 2016 12:00:00 GMT+0700 (ICT)');
    expect(nlp.when.tag).equal('date');

    expect(nlp.object).to.have.all.keys('text', 'tag');
    expect(nlp.object.text).equal('rain');
    expect(nlp.object.tag).equal('noun');

    expect(nlp.location).to.have.all.keys('text', 'tag');
    expect(nlp.location.text).equal('bangkok');
    expect(nlp.location.tag).equal('place');
  });

  it('Can detect if action is a past tense', () => {
    state.sentence = "I was there"
    const nlp = relations(state).nlp.relations;

    expect(nlp.action).to.have.all.keys('text', 'tag', 'verb');
    expect(nlp.action.verb.tense).equal('past');
  });

  it('Can detect if action is a future tense', () => {
    state.sentence = "I will be there"
    const nlp = relations(state).nlp.relations;

    expect(nlp.action).to.have.all.keys('text', 'tag', 'verb');
    expect(nlp.action.verb.tense).equal('future');
  });

  it('Can detect if action is negative', () => {
    state.sentence = "I won't be there"
    const nlp = relations(state).nlp.relations;

    expect(nlp.action).to.have.all.keys('text', 'tag', 'verb');
    expect(nlp.action.verb.negative).equal(true);
  });

  it('Can detect dates and parse to JavaScript type', () => {
    state.sentence = "I will be there tomorrow at 2pm"
    const nlp = relations(state).nlp.relations;

    expect(nlp.when.text instanceof Date).equal(true)
  });

});
