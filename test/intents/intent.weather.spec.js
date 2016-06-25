'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { weather } from '../../src/intents';
import ActionMock from '../actions/action.mock'

describe('IntentWeather', () => {

  let state = {};
  beforeEach( () => {
    state.action = undefined;
    state.classifier = [];
    state.tokens = ['will', 'rain', 'tomorrow', 'in', 'london']
  });

  it('Up & Running', async () => {
    expect(weather).to.be.ok;
  });

  it('Detected with {tokens}', async () => {
    await weather(state, [ActionMock]);

    expect(state.action).to.be.ok;
  });

  it('Detected with {classifier}', async () => {
    state.tokens = [];
    state.classifier = ['rain']
    await weather(state, [ActionMock]);

    expect(state.action).to.be.ok;
  });

  it('Not detected', async () => {
    state.tokens = [];
    state.classifier = [];
    expect( weather(state, [ActionMock]) ).to.be.rejected;
  });

});
