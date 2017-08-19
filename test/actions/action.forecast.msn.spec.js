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
    const action = await forecastMSN(state);

    expect(action).to.be.ok;
    expect(action).to.have.all.keys('engine', 'entity', 'related', 'title', 'value');
    expect(action.value).to.have.all.keys('code', 'condition', 'temperature', 'date');
  });

  it('Detected using relation location (forecast mode)', async () => {
    state.relations.when = undefined;
    const action = await forecastMSN(state);

    expect(action.related).to.be.ok;
  });

  it('Not detected', async () => {
    state.relations = undefined;

    const action = await forecastMSN(state);
    expect(action).to.have.all.keys('entity', 'request');
  });
});
