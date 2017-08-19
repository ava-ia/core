'use strict';

import { expect } from 'chai';
import language from '../../../src/modules/processor/language';

describe('Processor: language', () => {

  let state;
  beforeEach( () => state = {rawSentence: 'Hello world!'} );

  it('Up & Running', () => {
    expect(language).to.be.ok;
  });

  it('Compose property {language}', async () => {
    await language(state)
    expect(state).to.have.all.keys('rawSentence', 'sentence', 'language');
  });

  it('Detect English language', async () => {
    await language(state)
    expect(state.language).to.equal('en');
  });

  it('Detect non-english language', async () => {
    state.rawSentence = 'Hola me llamo Javi';
    await language(state)
    expect(state.language).to.equal('es');
  });

  it('Can not detect language', async () => {
    state.rawSentence = "abcdefghijklmnopqrstvxyz"; // 🤖Language
    await language(state)
    expect(state.language).not.to.be.ok;
  });
});
