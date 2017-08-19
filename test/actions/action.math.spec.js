/* @TODO:
      - Use operators + - * /
      - Detect modulus (%) operations
      - Improve matching sentence
*/
'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import { math } from '../../src/actions';

describe('Action: math', () => {

  let state = {};
  const a = 80;
  const b = 83;
  beforeEach( () => {
    state.action = undefined;
  });

  it('Up & Running', async () => {
    expect(math).to.be.ok;
  });

  it('Detect a addition (+) operation', () => {
    state.sentence = `How much is ${a} plus ${b}`;
    math(state);
    expect(state.action.value).to.be.equal(a + b);

    state.sentence = `How much is ${a}+${b}`;
    math(state);
    expect(state.action.value).to.be.equal(a + b);

    state.sentence = `add ${a} to ${b}`;
    math(state);
    expect(state.action.value).to.be.equal(a + b)
  });

  it('Detect a subtraction (-) operation', () => {
    state.sentence = `How much is ${a} minus ${b}`;
    math(state);
    expect(state.action.value).to.be.equal(a - b)

    state.sentence = `How much is ${a}-${b}`;
    math(state);
    expect(state.action.value).to.be.equal(a - b);

    state.sentence = `subtract ${a} to ${b}`;
    math(state);
    expect(state.action.value).to.be.equal(a - b);
  });

  it('Detect a multiplication (*) operation', () => {
    state.sentence = `How much is ${a} multiplied by ${b}`;
    math(state);
    expect(state.action.value).to.be.equal(a * b)

    state.sentence = `How much is ${a}*${b}`;
    math(state);
    expect(state.action.value).to.be.equal(a * b);
  });

  it('Detect a division (/) operation', () => {
    state.sentence = `How much is ${a} divided by ${b}`;
    math(state);
    expect(state.action.value).to.be.equal(a / b)

    state.sentence = `How much is ${a}/${b}`;
    math(state);
    expect(state.action.value).to.be.equal(a / b);
  });

  it('Not detected', async () => {
    state.sentence = 'Hello world';
    expect( math(state) ).to.equal(undefined);
  });
});
