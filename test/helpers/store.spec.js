'use strict';

import { expect } from 'chai';
import { store } from '../../src/helpers';

describe('Helper: store', () => {

  it('Up & Running', async () => {
    expect(store).to.be.ok;
  });

});
