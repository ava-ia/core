'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { forecastMSN } from '../../src/actions';

describe('Action: forecastMSN', () => {

  let state = {};
  beforeEach( () => {
    state.action = undefined;
    state.relations = {
      location: {text: 'madrid'},
      when: {text: new Date()}
    }
  });

  it('Up & Running', async () => {
    expect(forecastMSN).to.be.ok;
  });

  it('Detected using relations location & when', async () => {
    await forecastMSN(state);

    expect(state.action).to.be.ok;
    expect(state.action).to.have.all.keys('ms', 'engine', 'entity', 'title', 'value');
    expect(state.action.value).to.have.all.keys('code', 'condition', 'temperature', 'date');
  });

  it('Detected using relation location (forecast mode)', async () => {
    state.relations.when = undefined;
    await forecastMSN(state);

    expect(state.action.related).to.be.ok;
  });

  it('Not detected', async () => {
    state.relations = undefined;
    expect( forecastMSN(state) ).to.be.rejected;
  });
});
