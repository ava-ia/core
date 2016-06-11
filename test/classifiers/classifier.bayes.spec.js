import { assert, expect } from 'chai';
import { ClassifierBayes } from 'ava/classifiers';

describe('ClassifierBayes', () => {

  let state;
  beforeEach( () => state = {rawSentence: 'Hello world!', language: {iso: 'en'}, nlp: {}} );

  it('Up & Running', () => {
    const classifier = ClassifierBayes(state).classifier;

    expect(Object.keys(classifier).length).equal(3)
    expect(classifier.engine).equal('bayes');
    expect(typeof(classifier.ms)).equal('number');
    expect(Array.isArray(classifier.categories)).to.be.true;
  });

  it('Learn using a nlp.taxonomy', () => {
    state.nlp.taxonomy = 'greetings/developers';
    const classifier = ClassifierBayes(state).classifier;

    expect(Object.keys(classifier.categories).length).equal(2)
    expect(classifier.categories[0]).equal('greetings');
    expect(classifier.categories[1]).equal('developers');
  });

  it('Categorize without nlp.taxonomy', () => {
    const classifier = ClassifierBayes(state).classifier;

    expect(Object.keys(classifier.categories).length).equal(2)
    expect(classifier.categories[0]).equal('greetings');
    expect(classifier.categories[1]).equal('developers');
  });
});
