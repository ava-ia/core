'use strict';

import { assert, expect } from 'chai';
import classifier from '../../src/processor/classifier';

describe('Processor: classifier', () => {

  let state;
  beforeEach( () => state = {rawSentence: 'Hello world!', language: {iso: 'en'} } );

  it('Up & Running', () => {
    const result = classifier(state).classifier;

    expect(Object.keys(result).length).equal(3)
    expect(result.engine).equal('bayes');
    expect(typeof(result.ms)).equal('number');
    expect(Array.isArray(result.categories)).to.be.true;
  });

  it('Learn using a taxonomy', () => {
    state.taxonomy = 'greetings/developers';
    const result = classifier(state).classifier;

    expect(Object.keys(result.categories).length).equal(2)
    expect(result.categories[0]).equal('greetings');
    expect(result.categories[1]).equal('developers');
  });

  it('Categorize without taxonomy', () => {
    const result = classifier(state).classifier;

    expect(Object.keys(result.categories).length).equal(2)
    expect(result.categories[0]).equal('greetings');
    expect(result.categories[1]).equal('developers');
  });
});
