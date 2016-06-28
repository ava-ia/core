'use strict';

import { expect } from 'chai';
import { request } from '../../src/helpers';

describe('Helper: request', () => {

  let state = {};
  beforeEach( () => {
    state = {};
  });

  it('Up & Running', async () => {
    expect(request).to.be.ok;
  });

  it('Creates a request with an specific relation', async () => {
    const parameter = {relation: 'location'};
    request(state, parameter);
    expect(state.action).to.be.ok;
    expect(state.action.request).to.be.equal(parameter);
  });
});
