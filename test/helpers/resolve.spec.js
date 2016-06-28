'use strict';

import { expect } from 'chai';
import { resolve } from '../../src/helpers';
import { any } from '../../src/intents';

describe('Helper: resolve', () => {

  let state = {};
  beforeEach( () => {
    state = {};
  });

  it('Up & Running', async () => {
    expect(resolve).to.be.ok;
  });

  it('Finish the process if only have 1 intent', async () => {
    state.intents = [any];
    await resolve(state);
    expect(state).to.be.ok;
  });

  it('If dont have any intent wait', async () => {
    expect( resolve(state) ).to.be.rejected;
  });
});
