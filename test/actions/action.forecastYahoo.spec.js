'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { forecastYahoo } from '../../src/actions';

describe('Action: forecastYahoo', () => {

  let state = {};
  beforeEach( () => {
    state.action = undefined;
    state.relations = {
      location: {text: 'madrid'},
      when: {text: new Date()}
    }
  });

  it('Up & Running', async () => {
    expect(forecastYahoo).to.be.ok;
  });

  it('Detected using relations location & when', async () => {
    const action = await forecastYahoo(state);

    expect(action).to.be.ok;
    expect(action).to.have.all.keys('engine', 'entity', 'related', 'title', 'url', 'value');
    expect(action.value).to.have.all.keys('code', 'condition', 'temperature', 'date');
  });

  it('Detected using relation location (forecast mode)', async () => {
    state.relations.when = undefined;
    const action = await forecastYahoo(state);

    expect(action.related).to.be.ok;
  });

  it('Not detected', async () => {
    state.relations = undefined;
    const action = await forecastYahoo(state);
    expect(action).to.have.all.keys('entity', 'request');
  });
});
