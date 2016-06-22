'use strict';

import { assert, expect, should } from 'chai';
import relations from '../../src/processor/relations';
import colors from 'colors';

// -- Mock

describe('Processor: relations', () => {

  let state;

  beforeEach( () => state = {sentence: ''})

  it('Up & Running', () => {
    state.sentence = 'hello world';
    const result = relations(state).relations;

    expect(Object.keys(result).length).equal(1);
    expect(result).to.have.all.keys('object');

    expect(result.object).to.have.all.keys('text', 'tag');
    expect(result.object.text).equal('world');
    expect(result.object.tag).equal('noun');
  });

  it('Analize complex sentences', () => {
    state.sentence = "Ava, Do you know if tomorrow will rain in Bangkok?"
    const result = relations(state).relations;

    expect(result).to.have.all.keys('subject', 'action', 'when', 'object', 'location');

    expect(result.subject).to.have.all.keys('text', 'tag');
    expect(result.subject.text).equal('ava do you');
    expect(result.subject.tag).equal('person');

    expect(result.action).to.have.all.keys('text', 'tag', 'verb');
    expect(result.action.text).equal('will');
    expect(result.action.tag).equal('verb');

    expect(result.when).to.have.all.keys('text', 'tag');
    // expect(result.when.text).equal('Sun Jun 12 2016 12:00:00 GMT+0700 (ICT)');
    expect(result.when.tag).equal('date');

    expect(result.object).to.have.all.keys('text', 'tag');
    expect(result.object.text).equal('rain');
    expect(result.object.tag).equal('noun');

    expect(result.location).to.have.all.keys('text', 'tag');
    expect(result.location.text).equal('bangkok');
    expect(result.location.tag).equal('place');
  });

  it('Can detect if action is a past tense', () => {
    state.sentence = "I was there"
    const result = relations(state).relations;

    expect(result.action).to.have.all.keys('text', 'tag', 'verb');
    expect(result.action.verb.tense).equal('past');
  });

  it('Can detect if action is a future tense', () => {
    state.sentence = "I will be there"
    const result = relations(state).relations;

    expect(result.action).to.have.all.keys('text', 'tag', 'verb');
    expect(result.action.verb.tense).equal('future');
  });

  it('Can detect if action is negative', () => {
    state.sentence = "I won't be there"
    const result = relations(state).relations;

    expect(result.action).to.have.all.keys('text', 'tag', 'verb');
    expect(result.action.verb.negative).equal(true);
  });

  it('Can detect dates and parse to JavaScript type', () => {
    state.sentence = "I will be there tomorrow at 2pm"
    const result = relations(state).relations;

    expect(result.when.text instanceof Date).equal(true)
  });

});
