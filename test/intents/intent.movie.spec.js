'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { movie } from '../../src/intents';
import ActionMock from '../actions/action.mock'

describe('IntentMovie', () => {

  let state = {};
  beforeEach( () => {
    state.action = undefined;
    state.classifier = [];
    state.tokens = ['i', 'want', 'go', 'to', 'cinema']
  });

  it('Up & Running', async () => {
    expect(movie).to.be.ok;
  });

  it('Detected with {tokens}', async () => {
    await movie(state, [ActionMock]);

    expect(state.action).to.be.ok;
  });

  it('Detected with {classifier}', async () => {
    state.tokens = [];
    state.classifier = ['cinema']
    await movie(state, [ActionMock]);

    expect(state.action).to.be.ok;
  });

  it('Not detected', async () => {
    state.tokens = [];
    state.classifier = [];
    expect( movie(state, [ActionMock]) ).to.be.rejected;
  });
});
