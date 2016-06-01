// -- More info: https://github.com/nemo/natural-synaptic
'use strict';
import NaturalSynaptic from 'natural-synaptic';
let classifier = new NaturalSynaptic();
const FILE = './store/classifier.natural-synaptic/file.json';

export default {
  learn: (text, category) => {
    NaturalSynaptic.load(FILE, (error, classifier) => {
      classifier.addDocument(text, category);
      this.save();
    });
  },

  categorize: (text) => {
    return classifier.classify(text);
  },

  save: () => {
    classifier.save(FILE, (error) => {

    });
  }
};
