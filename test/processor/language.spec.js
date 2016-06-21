'use strict';

import { assert, expect, should, eventually } from 'chai';
import language from '../../src/processor/language';

describe('Processor: language', () => {

  let state;
  beforeEach( () => state = {rawSentence: 'Hello world!'} );

  it('Up & Running', async () => {
    await language(state)

    const result = state.language;
    expect(Object.keys(result).length).equal(4)
    expect(result.engine).equal('cld');
    expect(typeof(result.ms)).equal('number');
    expect(result.iso).equal('en');
    expect(typeof(result.percent)).equal('number');
  });

  it('Detect different language than english', async () => {
    state.rawSentence = 'Hola me llamo Javi';
    await language(state)

    expect(state.language.iso).equal('es');
  });

  it('If cant detect iso is null', async () => {
    state.rawSentence = "abcdefghijklmnopqrstvxyz"; // Klingon Language
    await language(state)

    expect(Object.keys(state.language).length).equal(0);
  });
});
