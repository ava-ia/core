'use strict';

import { expect } from 'chai';
import { entities } from '../../src/helpers';

describe('Helper: entities', () => {

  it('Up & Running', async () => {
    expect(entities).to.be.ok;
  });

  it('Detected a simple matching sentence', () => {
    expect(entities).to.have.all.keys('request', 'person', 'location', 'object', 'knowledge');
  });

});
