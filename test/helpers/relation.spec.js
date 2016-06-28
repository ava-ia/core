'use strict';

import { expect } from 'chai';
import { relation } from '../../src/helpers';

describe('Helper: relation', () => {

  let state = {};
  beforeEach( () => {
    state.relations = {
      subject: { text: 'ava' },
      action: { text: 'help' },
      location: { text: 'london' }
    }
  });

  it('Up & Running', async () => {
    expect(relation).to.be.ok;
  });

  it('Extract relations attributes', async () => {
    const { subject, location } = relation(['subject', 'location'], state);
    expect(subject).to.be.equal('ava');
    expect(location).to.be.equal('london');
  });

  it('cannot extract a specific relation', async () => {
    const { action, when } = relation(['action', 'when'], state);
    expect(action).to.be.equal('help');
    expect(when).not.to.be.ok;
  });
});
