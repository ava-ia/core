'use strict';

import { expect } from 'chai';
import relations from '../../src/processor/relations';

// -- Mock

describe('Processor: relations', () => {

  let state;

  beforeEach( () => state = {sentence: ''})

  it('Up & Running', () => {
    expect(relations).to.be.ok;
  });

  it('Compose property {relations}', () => {
    relations(state)
    expect(state).to.have.all.keys('sentence', 'relations');
  });

  it('Detect basic relations', () => {
    state.sentence = 'hello world';
    const value = relations(state).relations;

    expect(Object.keys(value).length).equal(1);
    expect(value).to.have.all.keys('object');

    expect(value.object).to.have.all.keys('text', 'tag');
    expect(value.object.text).equal('world');
    expect(value.object.tag).equal('noun');
  });

  it('Detect complex sentences', () => {
    state.sentence = "Ava, Do you know if tomorrow will rain in Bangkok?"
    const result = relations(state).relations;

    expect(result).to.have.all.keys('subject', 'action', 'when', 'object', 'location');

    expect(result.subject).to.have.all.keys('text', 'tag');
    expect(result.subject.text).equal('ava');
    expect(result.subject.tag).equal('person');

    expect(result.action).to.have.all.keys('text', 'tag', 'verb');
    expect(result.action.text).equal('will');
    expect(result.action.tag).equal('verb');

    expect(result.when).to.have.all.keys('text', 'tag');
    expect(result.when.tag).equal('date');

    expect(result.object).to.have.all.keys('text', 'tag');
    expect(result.object.text).equal('rain');
    expect(result.object.tag).equal('noun');

    expect(result.location).to.have.all.keys('text', 'tag');
    expect(result.location.text).equal('bangkok');
    expect(result.location.tag).equal('city');
  });

  it('Detect if {action} is a past tense', () => {
    state.sentence = "I was there"
    const result = relations(state).relations;

    expect(result.action).to.have.all.keys('text', 'tag', 'verb');
    expect(result.action.verb.tense).equal('past');
  });

  it('Detect if {action} is a future tense', () => {
    state.sentence = "I will be there"
    const result = relations(state).relations;

    expect(result.action).to.have.all.keys('text', 'tag', 'verb');
    expect(result.action.verb.tense).equal('future');
  });

  it('Detect if {action} is negative', () => {
    state.sentence = "I won't be there"
    const result = relations(state).relations;

    expect(result.action).to.have.all.keys('text', 'tag', 'verb');
    expect(result.action.verb.negative).equal(true);
  });

  it('Detect {when} and parse to JavaScript type', () => {
    state.sentence = "I will be there tomorrow at 2pm"
    const result = relations(state).relations;

    expect(result.when.text instanceof Date).equal(true)
  });

});
