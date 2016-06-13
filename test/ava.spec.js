'use strict';

import { assert, expect } from 'chai';
import colors from 'colors';
import Ava from '../src';

describe('Ava', function() {

  let ava;
  beforeEach( () => ava = new Ava() );

  it('Up & Running', function () {
    const methods = Object.keys(ava);

    expect(typeof(ava)).to.equal('object');

    expect(methods.length).to.equal(2);

    expect(methods[0]).to.equal('intent');
    expect(typeof(ava.intent)).to.equal('function');

    expect(methods[1]).to.equal('listen');
    expect(typeof(ava.listen)).to.equal('function');
  });

});
