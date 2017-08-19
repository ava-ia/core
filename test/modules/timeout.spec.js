'use strict';

import { expect } from 'chai';
import { timeout } from '../../src/modules';

describe('Helper: timeout', () => {

  it('Up & Running', async () => {
    expect(timeout).to.be.ok;
  });

});
