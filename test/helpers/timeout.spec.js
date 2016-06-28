'use strict';

import { expect } from 'chai';
import { timeout } from '../../src/helpers';

describe('Helper: timeout', () => {

  it('Up & Running', async () => {
    expect(timeout).to.be.ok;
  });

});
