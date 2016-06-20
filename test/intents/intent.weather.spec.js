'use strict';

import { assert, expect, should } from 'chai';
import { weather } from '../../src/intents';
// -- Mock
import ActionMock from './action.mock'

describe('IntentWeather', () => {

  let state = {
    classifier: {categories: []}
  };
  let intent;

  beforeEach( () => {
    intent = {script: weather, actions: [ActionMock]};
    state.action = undefined;
    state.nlp = {tokens: ['will', 'rain', 'tomorrow', 'in', 'london']}
  });

  it('Up & Running', async () => {
    await weather(state, intent.actions);

    expect(Object.keys(state.action).length).equal(3)
    expect(state.action.engine).equal('mock');
    expect(typeof(state.action.ms)).equal('number');
  });

  it('Should have {when} & {location} relations', async () => {
    // @TODO
  });

  it('If dont have {when} response with an forecast', async () => {
    // @TODO
  });

  it('If dont have {location} ask for it', async () => {
    // @TODO
  });

});
