'use strict';

import { expect } from 'chai';

import translator from '../../../src/modules/processor/translator';

describe('Processor: translator', () => {

  let state;
  beforeEach( () => state = {})

  it('Up & Running', () => {
    expect(translator).to.be.ok;
  });

  it('Detected an english sentence', async () => {
    state.rawSentence = 'hello world';
    state.language = 'en';
    await translator(state);

    expect(state.language).equal('en');
    expect(state.sentence).equal(undefined);
  });

  it('Detected a non-english sentence, translate it and identify the language', async () => {
    state.rawSentence = 'Hola Mundo!';
    await translator(state);

    expect(state.language).equal('es');
    expect(state.sentence).equal('Hello World!');
  });

});
