'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { calc } from '../../src/intents';
import ActionMock from '../actions/action.mock'

describe('IntentCalc', () => {

  let state = {};
  beforeEach( () => {
    state.action = undefined;
    state.classifier = [];
    state.tokens = ['i', 'want', 'multiply', '3', 'and', '5']
  });

  it('Up & Running', async () => {
    expect(calc).to.be.ok;
  });

  it('Detected with {tokens}', async () => {
    expect(calc(state, [ActionMock])).to.be.ok;
  });

  it('Not detected', async () => {
    state.tokens = [];
    state.classifier = [];
    expect( calc(state, [ActionMock]) ).to.be.rejected;
  });
});
