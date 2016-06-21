'use strict';

import { assert, expect, should, eventually } from 'chai';
import language from '../../src/processor/language';

describe('Processor: language', () => {

  let state;
  beforeEach( () => state = {rawSentence: 'Hello world!'} );

  it('Up & Running', async () => {
    await language(state)

    expect(state.language).equal('en');
  });

  it('Detect different language than english', async () => {
    state.rawSentence = 'Hola me llamo Javi';
    await language(state)

    expect(state.language).equal('es');
  });

  it('If cant detect iso is null', async () => {
    state.rawSentence = "abcdefghijklmnopqrstvxyz"; // 🤖Language
    await language(state)

    expect(state.language).to.equal(undefined);
  });
});
