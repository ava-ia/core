'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { movieDB } from '../../src/actions';

describe('Action: movieDB', () => {

  let state = {};
  beforeEach( () => {
    state.action = undefined;
    state.relations = {
      subject: {text: 'Leonardo Dicaprio'}
    }
  });

  it('Up & Running', async () => {
    expect(movieDB).to.be.ok;
  });
});
