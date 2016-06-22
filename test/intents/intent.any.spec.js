'use strict';

import { assert, expect, should } from 'chai';
import { any } from '../../src/intents';
// -- Mock
import ActionMock from '../actions/action.mock'

describe('IntentAny', () => {

  let state = {};
  let intent;

  beforeEach( () => {
    intent = {script: any, actions: [ActionMock]};
    state.action = undefined;
  });

  it('Up & Running', async () => {
    await any(state, intent.actions);

    expect(Object.keys(state.action).length).equal(3)
    expect(state.action.engine).equal('mock');
    expect(typeof(state.action.ms)).equal('number');
  });

});
