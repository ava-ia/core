'use strict';

import { assert, expect, should } from 'chai';
import { Salient } from 'ava/defaults/nlp/processors';
// -- Mock

describe('ProcessorSalient', () => {

  let state;

  beforeEach( () => state = {sentence: '', nlp: {}})

  it('Up & Running', () => {
    state.sentence = 'hello world';
    const nlp = Salient(state).nlp;

    expect(Object.keys(nlp).length).equal(3);
    expect(nlp.concepts.length).equal(1);
    expect(nlp.concepts[0]).equal('world');
    expect(nlp.sentiment).equal(0);
    expect(nlp.tokens.length).equal(2);
    expect(nlp.tokens[0]).equal('hello');
    expect(nlp.tokens[1]).equal('world');
  });

  it('Can detect a positive sentiment', () => {
    state.sentence = 'I love you!';
    const nlp = Salient(state).nlp;

    expect(nlp.sentiment).equal(3);
  });

  it('Can detect a negative sentiment', () => {
    state.sentence = 'I hate you!';
    const nlp = Salient(state).nlp;

    expect(nlp.sentiment).equal(-3);
  });

  it('Can detect more than one concept', () => {
    state.sentence = 'I wanna visit Facebook Headquarters based in New York';
    const nlp = Salient(state).nlp;

    expect(nlp.concepts.length).equal(2);
    expect(nlp.concepts[0]).equal('facebook headquarters');
    expect(nlp.concepts[1]).equal('new york');
  });

});
