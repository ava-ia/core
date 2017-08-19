'use strict';

import { expect } from 'chai';

import sentiment from '../../../src/modules/processor/sentiment';

describe('Processor: sentiment', () => {

  let state;

  beforeEach( () => state = {sentence: ''})

  it('Up & Running', () => {
    expect(sentiment).to.be.ok;
  });

  it('Compose property {sentiment}', () => {
    sentiment(state)
    expect(state).to.have.all.keys('sentence', 'sentiment');
  });

  it('Detected a neutral sentiment', () => {
    state.sentence = 'hello world';
    sentiment(state);
    expect(state.sentiment).equal(0);
  });

  it('Detected a positive sentiment', () => {
    state.sentence = 'I love you!';
    sentiment(state);
    expect(state.sentiment).equal(3);
  });

  it('Detected a negative sentiment', () => {
    state.sentence = 'I hate you!';
    sentiment(state);
    expect(state.sentiment).equal(-3);
  });

});
