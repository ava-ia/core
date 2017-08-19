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

  let action;
  let state = {};
  const a = 80;
  const b = 83;
  beforeEach( () => {
    action = undefined;
  });

  it('Up & Running', async () => {
    expect(math).to.be.ok;
  });

  it('Detect a addition (+) operation', () => {
    state.sentence = `How much is ${a} plus ${b}`;
    action = math(state);
    expect(action.value).to.be.equal(a + b);

    state.sentence = `How much is ${a} + ${b}`;
    action = math(state);
    expect(action.value).to.be.equal(a + b);

    state.sentence = `add ${a} to ${b}`;
    action = math(state);
    expect(action.value).to.be.equal(a + b)
  });

  it('Detect a subtraction (-) operation', () => {
    state.sentence = `How much is ${a} minus ${b}`;
    action = math(state);
    expect(action.value).to.be.equal(a - b)

    state.sentence = `How much is ${a} - ${b}`;
    action = math(state);
    expect(action.value).to.be.equal(a - b);

    state.sentence = `subtract ${a} to ${b}`;
    action = math(state);
    expect(action.value).to.be.equal(a - b);
  });

  it('Detect a multiplication (*) operation', () => {
    state.sentence = `How much is ${a} multiplied by ${b}`;
    action = math(state);
    expect(action.value).to.be.equal(a * b)

    state.sentence = `How much is ${a} * ${b}`;
    action = math(state);
    expect(action.value).to.be.equal(a * b);
  });

  it('Detect a division (/) operation', () => {
    state.sentence = `How much is ${a} divided by ${b}`;
    action = math(state);
    expect(action.value).to.be.equal(a / b)

    // state.sentence = `How much is ${a} / ${b}`;
    // action = math(state);
    // expect(action.value).to.be.equal(a / b);
  });

  it('Not detected', async () => {
    state.sentence = 'Hello world';
    action = math(state);
    expect( action ).to.equal(undefined);
  });
});
