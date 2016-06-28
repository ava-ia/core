'use strict';

import { expect } from 'chai';
import { syntax } from '../../src/helpers';

describe('Helper: syntax', () => {

  let sentence = 'how much is 20 euros in dollars?';

  it('Up & Running', async () => {
    expect(syntax).to.be.ok;
  });

  it('Detected a simple matching sentence', () => {
    const state = syntax(sentence, '20 euro in dollar');
    expect(state).to.be.ok;
  });

  it('Detected a complex matching sentence', () => {
    const state = syntax(sentence, '[value] [currency] [preposition] [currency]');

    expect(state).to.be.ok;
    expect(state).to.have.all.keys('value', 'currency', 'preposition');
    expect(state.value).to.equal('20');
    expect(state.currency[0]).to.equal('euro');
    expect(state.currency[1]).to.equal('dollar');
    expect(state.preposition).to.equal('in');
  });

  it('Undetect a matching sentence', () => {
    const state = syntax(sentence, '[currency] [value]');
    expect(state).not.to.be.ok;
  });
});
