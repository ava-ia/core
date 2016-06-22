'use strict';

import { assert, expect, should } from 'chai';
import sentiment from '../../src/processor/sentiment';
// -- Mock

describe('Processor: sentiment', () => {

  let state;

  beforeEach( () => state = {sentence: ''})

  it('Up & Running', () => {
    state.sentence = 'hello world';
    sentiment(state);

    expect(state).to.have.all.keys('sentence', 'sentiment', 'tokens');
    expect(state.sentiment).equal(0);
    expect(state.tokens.length).equal(2);
    expect(state.tokens[0]).equal('hello');
    expect(state.tokens[1]).equal('world');
  });

  it('Can detect a positive sentiment', () => {
    state.sentence = 'I love you!';
    sentiment(state);

    expect(state.sentiment).equal(3);
  });

  it('Can detect a negative sentiment', () => {
    state.sentence = 'I hate you!';
    sentiment(state);

    expect(state.sentiment).equal(-3);
  });

});
