'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { translator } from '../../src/actions';

describe('Action: translator', () => {

  let state = {};
  beforeEach( () => {
    state.action = undefined;
    state.tokens = ['translate'];
    state.sentence = undefined;
  });

  it('Up & Running', async () => {
    expect(translator).to.be.ok;
  });

  it("Detected using 'translate into...'", async () => {
    state.sentence = 'How can I translate into italian i have hungry';
    await translator(state);

    expect(state.action).to.be.ok;
    expect(state.action.value.toLowerCase()).to.be.equal('ho fame');
  });

  it("Detected using 'how can i translate in...'", async () => {
    state.sentence = "How can I translate in spanish i'm hungry";
    await translator(state);

    expect(state.action).to.be.ok;
    expect(state.action.value.toLowerCase()).to.be.equal('tengo hambre');
  });

  it('Not detected', async () => {
    state.sentence = 'Hello world';
    expect( translator(state) ).to.be.rejected;
  });
});
