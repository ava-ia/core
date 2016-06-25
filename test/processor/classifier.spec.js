'use strict';

import { expect } from 'chai';
import classifier from '../../src/processor/classifier';

describe('Processor: classifier', () => {

  let state;
  beforeEach( () => state = { rawSentence: 'Hello world!', language: 'en' } );

  it('Up & Running', () => {
    expect(classifier).to.be.ok;
  });

  it('Compose property {classifier}', () => {
    classifier(state)
    expect(state).to.have.all.keys('rawSentence', 'language', 'classifier');
  });

  it('Learn using a taxonomy', () => {
    state.taxonomy = 'greetings/developers';
    classifier(state);

    expect(state.classifier.length).equal(2)
    expect(state.classifier[0]).equal('greetings');
    expect(state.classifier[1]).equal('developers');
  });

  it('Categorize without taxonomy', () => {
    classifier(state);

    expect(state.classifier.length).equal(2)
    expect(state.classifier[0]).equal('greetings');
    expect(state.classifier[1]).equal('developers');
  });
});
