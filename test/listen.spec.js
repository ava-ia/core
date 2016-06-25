'use strict';

import pkg from '../package.json';
import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import Ava from '../src';
import { any, weather } from '../src/intents'
import actionMock from './actions/action.mock'

import colors from 'colors';

describe('.listen()', () => {

  let ava;
  beforeEach( () => ava = new Ava() );

  it('Up and running', () => {
    expect(ava.listen).to.be.ok;
  });

  it('Returns a Promise (then/catch)', () => {
    const listen = ava.listen();

    expect(listen instanceof Promise).to.equal(true);
    expect(typeof(listen.then)).to.equal('function');
    expect(typeof(listen.catch)).to.equal('function');
  });

  it('Is successful', () => {
    ava.intent(any, actionMock);
    const state = await ava.listen('Hello world!');

    expect(state.version).to.equal(pkg.version);
    expect(state.intents.length).to.equal(1);
    expect(state.action).to.exist;
  });

  it('Listen is unsuccesful because no intent is matched', () => {
    ava.intent(weather, actionMock);

    expect( ava.listen('Hello world!') ).to.be.rejected;
  });

  it('Listen is unsuccesful because timeout', () => {
    ava.intent(any, []);
    const timeout = 300;

    expect( ava.listen('Hello world!', timeout) ).to.be.rejected;
  });

});
