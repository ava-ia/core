// -- More info: https://github.com/nemo/natural-synaptic
'use strict';
import NaturalSynaptic from 'natural-synaptic';
const classifier = new NaturalSynaptic();

classifier.addDocument('my unit-tests failed.', 'software');
classifier.addDocument('tried the program, but it was buggy.', 'software');
classifier.addDocument('tomorrow we will do standup.', 'meeting');
classifier.addDocument('the drive has a 2TB capacity.', 'hardware');
classifier.addDocument('i need a new power supply.', 'hardware');
classifier.addDocument('can you play some new music?', 'music');

classifier.train();

classifier.save("file_to_save.json", function(err) {
  NaturalSynaptic.load("file_to_save.json", function(err, newClassifier) {
    console.log(newClassifier.classify('did the tests pass?')); // -> software
    console.log(newClassifier.classify('did you buy a new drive?')); // -> hardware
    console.log(newClassifier.classify('What is the capacity?')); // -> hardware
    console.log(newClassifier.classify('Lets meet tomorrow?')); // -> meeting
    console.log(newClassifier.classify('Can you play some stuff?')); // -> music
  });
});
