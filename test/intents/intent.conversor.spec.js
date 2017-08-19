'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { conversor } from '../../src/intents';
import ActionMock from '../actions/action.mock'

describe('IntentConversor', () => {

  let state = {};
  beforeEach( () => {
    state.action = undefined;
    state.sentence = 'how much is 20 euros in dollars?';
  });

  it('Up & Running', () => {
    expect(conversor).to.be.ok;
  });

  it("Detected with rule 'how much is...'", () => {
    expect(conversor(state, [ActionMock])).to.be.ok;
  });

  it("Detected with rule 'convert...'", () => {
    // -- @TODO: 👻 'Ava I need convert 20 dollars into euros' is not detected.
    state.sentence = 'Ava, can you convert 20 dollars into euros'
    expect(conversor(state, [ActionMock])).to.be.ok;
  });

  it('Not detected', () => {
    state.sentence = 'Hello World!';
    expect(conversor(state, [ActionMock])).not.to.be.ok;
  });
});
