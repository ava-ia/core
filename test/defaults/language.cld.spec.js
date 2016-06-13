'use strict';

import { assert, expect, should, eventually } from 'chai';
import { languageCLD } from '../../src/defaults';

describe('languageCLD', () => {

  let state;
  beforeEach( () => state = {rawSentence: 'Hello world!'} );

  it('Up & Running', async () => {
    await languageCLD(state)

    const language = state.language;
    expect(Object.keys(language).length).equal(4)
    expect(language.engine).equal('cld');
    expect(typeof(language.ms)).equal('number');
    expect(language.iso).equal('en');
    expect(typeof(language.percent)).equal('number');
  });

  it('Detect different language than english', async () => {
    state.rawSentence = 'Hola me llamo Javi';
    await languageCLD(state)

    const language = state.language;
    expect(language.iso).equal('es');
  });

  it('If cant detect iso is null', async () => {
    state.rawSentence = "abcdefghijklmnopqrstvxyz"; // Klingon Language
    await languageCLD(state)

    const language = state.language;
    expect(Object.keys(language).length).equal(0);
  });
});
