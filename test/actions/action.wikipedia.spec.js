'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { wikipedia } from '../../src/actions';

describe('Action: wikipedia', () => {

  let state = {};
  beforeEach( () => {
    state.action = undefined;
    state.relations = {
      subject: {text: 'Leonardo Dicaprio'}
    }
  });

  it('Up & Running', async () => {
    expect(wikipedia).to.be.ok;
  });

});
