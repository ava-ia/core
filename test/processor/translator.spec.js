'use strict';

import { assert, expect, should } from 'chai';
import translator from '../../src/processor/translator';
// -- Mock

describe('Processor: translator', () => {

  let state;

  beforeEach( () => state = {})

  it('Up & Running', async () => {
    state.rawSentence = 'hello world';
    state.language = 'en';
    await translator(state);

    expect(state.language).equal('en');
    expect(state.sentence).equal(undefined);
  });

  it('If a sentence is not english, translate it and identify the language', async () => {
    state.rawSentence = 'Hola Mundo!';
    await translator(state);

    expect(state.language).equal('es');
    expect(state.sentence).equal('Hello World!');
  });

});
