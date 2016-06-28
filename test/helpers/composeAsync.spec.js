'use strict';

import { expect } from 'chai';
import { composeAsync } from '../../src/helpers';

describe('Helper: composeAsync', () => {

  it('Up & Running', async () => {
    expect(composeAsync).to.be.ok;
  });

});
