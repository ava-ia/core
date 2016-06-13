'use strict';

import { assert, expect, should } from 'chai';
import { weather } from '../../src/intents';
// -- Mock
import ActionMock from './action.mock'

describe('IntentWeather', () => {

  let state = {
    actions: [],
    classifier: {categories: []}
  };
  let intent;

  beforeEach( () => {
    intent = {script: weather, actions: [ActionMock]};
    state.actions = [];
    state.nlp = {tokens: ['will', 'rain', 'tomorrow', 'in', 'london']}
  });

  it('Up & Running', async () => {
    await weather(state, intent);

    const actions = state.actions;
    expect(actions.length).equal(1);

    const action = actions[0];
    expect(Object.keys(action).length).equal(3)
    expect(action.engine).equal('mock');
    expect(typeof(action.ms)).equal('number');
  });
});
