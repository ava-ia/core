'use strict';

import { assert, expect, should } from 'chai';
import Ava from '../src';
import { any } from '../src/intents';
import actionMock from './actions/action.mock';


describe('.intent()', () => {

  let ava;
  beforeEach( () => ava = new Ava() );

  it('Up and running', () => {
    expect(ava.intent).to.be.ok;
  });

  it('can add a new instance to Ava instance', () => {
    const state = ava.intent(any, actionMock);

    expect(ava.intent(any, actionMock)).to.be.ok;
  });

  it('method may be chainable', () => {
    const instance = ava.intent(any, actionMock);

    expect(instance).to.have.all.keys('intent', 'listen');
  });
});
