'use strict';

import { assert, expect, should } from 'chai';
import { movie } from '../../src/intents';
// -- Mock
import ActionMock from './action.mock'

describe('IntentMovie', () => {

  let state = {
    classifier: { categories: [] }
  };
  let intent;

  beforeEach( () => {
    intent = {script: movie, actions: [ActionMock]};
    state.action = undefined;
    state.tokens = ['i', 'want', 'go', 'to', 'cinema']
  });

  it('Up & Running', async () => {
    await movie(state, intent.actions);

    expect(Object.keys(state.action).length).equal(3)
    expect(state.action.engine).equal('mock');
    expect(typeof(state.action.ms)).equal('number');
  });

});
