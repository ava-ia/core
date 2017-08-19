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

  it('Up & Running', () => {
    expect(translate).to.be.ok;
  });

  it('Detected with {syntax} (rule n1) ', () => {
    state.sentence = 'How can I translate into italian i have hungry';
    expect(translate(state, [ActionMock])).to.be.ok;
  });

  it('Detected with {syntax} (rule n1) and gerund verb', () => {
    state.sentence = 'can you help me translating into spanish hello i am javi';
    expect(translate(state, [ActionMock])).to.be.ok;
  });

  // -- @TODO: 👻 when compromise fix the syntax matching ---------------------
  // it('Detected with {syntax} (rule n2) ', () => {
  //   state.sentence = 'Ava, how can translate hello world in thai';
  //   translate(state, [ActionMock]);
  //   expect(translate(state, [ActionMock])).to.be.ok;
  // });
  // ---------------------------------------------------------------------------

  it('Not detected', () => {
    state.sentence = 'Hello world!';
    expect(translate(state, [ActionMock])).not.to.be.ok;
  });
});
