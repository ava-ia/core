'use strict';

import { assert, expect, should } from 'chai';
import { compromise } from '../../src/defaults/processors';
// -- Mock

describe('ProcessorCompromise', () => {

  let state;

  beforeEach( () => state = {nlp: {}})

  it('Up & Running', () => {
    state.sentence = 'Hello world';
    const nlp = compromise(state).nlp;

    expect(Object.keys(nlp).length).equal(2);
    expect(nlp.type).equal('declarative');
    expect(nlp.topics.length).equal(0);
  });

  it('Can get topics in a sentence', () => {
    state.sentence = 'I wanna go to London next week';
    const nlp = compromise(state).nlp;

    expect(nlp.topics.length).equal(1);
    expect(nlp.topics[0].text).equal('london');
  });

  it('Can detect interrogative sentences', () => {
    state.sentence = 'Where you wanna go tonight?';
    const nlp = compromise(state).nlp;

    expect(nlp.type).equal('interrogative');
  });

  it('Can detect exclamative sentences', () => {
    state.sentence = 'I hate you!';
    const nlp = compromise(state).nlp;

    expect(nlp.type).equal('exclamative');
  });


});
