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

  it('Up & Running', () => {
    expect(weather).to.be.ok;
  });

  it('Detected with {tokens}', () => {
    expect(weather(state, [ActionMock])).to.be.ok;
  });

  it('Detected with {classifier}', () => {
    state.tokens = [];
    state.classifier = ['rain']
    expect(weather(state, [ActionMock])).to.be.ok;
  });

  it('Not detected', () => {
    state.tokens = [];
    state.classifier = [];
    expect(weather(state, [ActionMock])).not.to.be.ok;
  });

});
