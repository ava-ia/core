'use strict';

import { assert, expect, should } from 'chai';
import { sentiment } from '../../src/defaults/processors';
// -- Mock

describe('ProcessorSentiment', () => {

  let state;

  beforeEach( () => state = {sentence: '', nlp: {}})

  it('Up & Running', () => {
    state.sentence = 'hello world';
    const nlp = sentiment(state).nlp;

    expect(nlp).to.have.all.keys('sentiment', 'tokens');
    expect(nlp.sentiment).equal(0);
    expect(nlp.tokens.length).equal(2);
    expect(nlp.tokens[0]).equal('hello');
    expect(nlp.tokens[1]).equal('world');
  });

  it('Can detect a positive sentiment', () => {
    state.sentence = 'I love you!';
    const nlp = sentiment(state).nlp;

    expect(nlp.sentiment).equal(3);
  });

  it('Can detect a negative sentiment', () => {
    state.sentence = 'I hate you!';
    const nlp = sentiment(state).nlp;

    expect(nlp.sentiment).equal(-3);
  });

});
