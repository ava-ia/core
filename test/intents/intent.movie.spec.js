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

  it('Up & Running', () => {
    expect(movie).to.be.ok;
  });

  it('Detected with {tokens}', () => {
    expect(movie(state, [ActionMock])).to.be.ok;
  });

  it('Detected with {classifier}', () => {
    state.tokens = [];
    state.classifier = ['cinema']
    expect(movie(state, [ActionMock])).to.be.ok;
  });

  it('Not detected', () => {
    state.tokens = [];
    state.classifier = [];
    expect( movie(state, [ActionMock]) ).not.to.be.ok;
  });
});
