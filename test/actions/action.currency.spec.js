'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { currency } from '../../src/actions';

describe('Action: currency', () => {

  let state = {};
  beforeEach( () => {
    state.action = undefined;
  });

  it('Up & Running', async () => {
    expect(currency).to.be.ok;
  });

  it('Detected using name of currency', async () => {
    const quantity = 10;
    state.sentence = `convert ${quantity} euros into dollars`;
    await currency(state);

    expect(state.action).to.be.ok;
    expect(state.action.value).to.be.above(quantity);
  });

  it('Detected using acronym of currency', async () => {
    const quantity = 10;
    state.sentence = `convert ${quantity} eur into usd`;
    await currency(state);

    expect(state.action).to.be.ok;
    expect(state.action.value).to.be.above(quantity);
  });

  it('Not Detected using symbol of currency', async () => {
    const quantity = 10;
    state.sentence = `convert ${quantity} € into $`;

    expect( currency(state) ).to.be.rejected;
  });

  it('Not detected', async () => {
    state.sentence = 'Hello world';

    expect( currency(state) ).to.be.rejected;
  });
});
