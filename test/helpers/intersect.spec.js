'use strict';

import { expect } from 'chai';
import { intersect } from '../../src/helpers';

describe('Helper: intersect', () => {

  let terms = ['film', 'movie', 'cinema'];
  let state = {};
  beforeEach( () => {
    state.tokens = ['i', 'wanna', 'go', 'to', 'cinema', 'this', 'evening'];
  });

  it('Up & Running', async () => {
    expect(intersect).to.be.ok;
  });

  it('Detected an array intersection', async () => {
    const value = intersect(terms, state.tokens);
    expect(value).to.be.true;
  });

  it('Not detected', async () => {
    state.tokens =  ['i', 'wanna', 'go', 'to', 'mcdonalds', 'this', 'evening'];
    const value = intersect(terms, state.tokens);
    expect(value).to.be.false;
  });
});
