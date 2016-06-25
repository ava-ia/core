'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { translate } from '../../src/intents';
import ActionMock from '../actions/action.mock'

describe('IntentTranslate', () => {

  let state = {};
  beforeEach( () => {
    state.action = undefined;
  });

  it('Up & Running', async () => {
    expect(translate).to.be.ok;
  });

  it('Detected with {syntax} (rule n1) ', async () => {
    state.sentence = 'How can I translate into italian i have hungry';
    await translate(state, [ActionMock]);
    expect(state.action).to.be.ok;
  });

  it('Detected with {syntax} (rule n1) and gerund verb', async () => {
    state.sentence = 'can you help me translating into spanish hello i am javi';
    await translate(state, [ActionMock]);
    expect(state.action).to.be.ok;
  });

  // -- @TODO: 👻 when compromise fix the syntax matching ---------------------
  // it('Detected with {syntax} (rule n2) ', async () => {
  //   state.sentence = 'Ava, how can translate hello world in thai';
  //   await translate(state, [ActionMock]);
  //   expect(state.action).to.be.ok;
  // });
  // ---------------------------------------------------------------------------

  it('Not detected', async () => {
    state.sentence = 'Hello world!';
    expect( translate(state, [ActionMock]) ).to.be.rejected;
  });
});
