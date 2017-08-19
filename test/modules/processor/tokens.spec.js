'use strict';

import { expect } from 'chai';

import tokens from '../../../src/modules/processor/tokens';

describe('Processor: tokens', () => {

  let state;

  beforeEach( () => state = {sentence: ''})

  it('Up & Running', () => {
    expect(tokens).to.be.ok;
  });

  it('Compose property {tokens}', () => {
    tokens(state)
    expect(state).to.have.all.keys('sentence', 'tokens');
  });

  it('Tokenize sentence', () => {
    state.sentence = 'hello world';
    tokens(state);
    expect(state.tokens.length).to.equal(2);
    expect(state.tokens[0]).to.equal('hello');
    expect(state.tokens[1]).to.equal('world');
  });

  it('Tokenize sentence and root verbs', () => {
    state.sentence = "Going to London";
    tokens(state);
    expect(state.tokens.length).to.equal(3);
    expect(state.tokens[0]).to.equal('go');
    expect(state.tokens[1]).to.equal('to');
    expect(state.tokens[2]).to.equal('london');
  });

  it('Tokenize sentence and root parsing numbers', () => {
    state.sentence = "three apples";
    tokens(state);
    expect(state.tokens.length).to.equal(2);
    expect(state.tokens[0]).to.equal('3');
  });

  it('Tokenize sentence and root parsing singular nouns', () => {
    state.sentence = "three apples";
    tokens(state);
    expect(state.tokens.length).to.equal(2);
    expect(state.tokens[1]).to.equal('apple');
  });

  it('Tokenize sentence and use infinitive verbs', () => {
    state.sentence = "It's raining now in London";
    tokens(state);
    expect(state.tokens.length).to.equal(6);
    expect(state.tokens[1]).to.equal('is');
    expect(state.tokens[2]).to.equal('rain');
  });
});
