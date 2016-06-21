'use strict';

import { assert, expect, should } from 'chai';
import compromise from '../../src/processor/compromise';
// -- Mock

describe('Processor: compromise', () => {

  let state;

  beforeEach( () => state = {})

  it('Up & Running', () => {
    state.sentence = 'Hello world';
    compromise(state);

    expect(Object.keys(state).length).equal(3);
    expect(state.type).equal('declarative');
    expect(state.topics.length).equal(0);
  });

  it('Can get topics in a sentence', () => {
    state.sentence = 'I wanna go to London next week';
    compromise(state);

    expect(state.topics.length).equal(1);
    expect(state.topics[0].text).equal('london');
  });

  it('Can detect interrogative sentences', () => {
    state.sentence = 'Where you wanna go tonight?';
    compromise(state);

    expect(state.type).equal('interrogative');
  });

  it('Can detect exclamative sentences', () => {
    state.sentence = 'I hate you!';
    compromise(state);

    expect(state.type).equal('exclamative');
  });

});
